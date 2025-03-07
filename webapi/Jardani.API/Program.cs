using Jardani.API.Exceptions.ExceptionHandlers;
using Jardani.API.Middlewares;
using Jardani.Application.IServices;
using Jardani.Domain.Entities;
using Jardani.Infrastructure;
using Jardani.Infrastructure.EFCore.Contexts;
using Jardani.Infrastructure.EFCore.Seeds;
using Jardani.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

{
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.ConfigureInfrastructureServices(builder.Configuration);
    builder.Services.AddExceptionHandler<BadRequestExceptionHandler>();
    builder.Services.AddExceptionHandler<UnauthorizedExceptionHandler>();
    builder.Services.AddExceptionHandler<NotFoundExceptionHandler>();
    builder.Services.AddExceptionHandler<InternalServerExceptionHandler>();
    builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
    builder.Services.AddProblemDetails();
    builder.Services.AddCors();
    builder.Services.AddSingleton<IConnectionMultiplexer>(config =>
    {
        var connString = builder.Configuration.GetConnectionString("Redis")
            ?? throw new Exception("Cannot get redis connection string");
        var configuration = ConfigurationOptions.Parse(connString, true);
        return ConnectionMultiplexer.Connect(configuration);
    });
    builder.Services.AddSingleton<ICartService, CartService>();
    builder.Services.AddAuthorization();
    builder.Services.AddIdentityApiEndpoints<AppUser>()
                    .AddEntityFrameworkStores<StoreDbContext>();
}

var app = builder.Build();

{
    app.UseExceptionHandler(opt => { });
    app.UseCors(
        x => x.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins("http://localhost:4200", "https://localhost:4200"));
    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();
    app.MapGroup("api").MapIdentityApi<AppUser>(); // api/login

    try
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<StoreDbContext>();
        await context.Database.MigrateAsync();
        await StoreContextSeeds.SeedAsync(context);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
        throw;
    }

    app.Run();
}
