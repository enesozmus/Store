using Jardani.Infrastructure;
using Jardani.Infrastructure.EFCore.Contexts;
using Jardani.Infrastructure.EFCore.Seeds;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

{
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.ConfigureInfrastructureServices(builder.Configuration);
}

var app = builder.Build();

{
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
