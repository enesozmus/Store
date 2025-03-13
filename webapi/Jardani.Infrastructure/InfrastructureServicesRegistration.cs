using Jardani.Application.IRepositories;
using Jardani.Application.IServices;
using Jardani.Infrastructure.EFCore.Contexts;
using Jardani.Infrastructure.Repositories;
using Jardani.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Jardani.Infrastructure;

public static class InfrastructureServicesRegistration
{
     public static IServiceCollection ConfigureInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
     {
          #region Microsoft SQL Server

          services.AddDbContext<StoreDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

          #endregion

          #region Repositories

          services.AddScoped(typeof(IReadRepository<>), typeof(ReadRepository<>));
          services.AddScoped(typeof(IWriteRepository<>), typeof(WriteRepository<>));

          services.AddScoped<IProductReadRepository, ProductReadRepository>();
          services.AddScoped<IProductWriteRepository, ProductWriteRepository>();

          services.AddSingleton<ICartService, CartService>();
          services.AddScoped<IPaymentService, PaymentService>();

          #endregion

          return services;
     }
}