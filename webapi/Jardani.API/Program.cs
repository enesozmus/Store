using Jardani.API.Exceptions.ExceptionHandlers;
using Jardani.API.Middlewares;
using Jardani.Infrastructure;
using Jardani.Infrastructure.EFCore.Contexts;
using Jardani.Infrastructure.EFCore.Seeds;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

{
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.ConfigureInfrastructureServices(builder.Configuration);
    builder.Services.AddExceptionHandler<BadRequestExceptionHandler>();
    builder.Services.AddExceptionHandler<UnauthorizedExceptionHandler>();
    builder.Services.AddExceptionHandler<NotFoundExceptionHandler>();
    builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
    builder.Services.AddProblemDetails();
    builder.Services.AddCors();
}

var app = builder.Build();

{
    app.UseExceptionHandler(opt => { });
    app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4200","https://localhost:4200"));
    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

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
