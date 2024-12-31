using Jardani.Domain.Entities;
using Jardani.Infrastructure.EFCore.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Jardani.Infrastructure.EFCore.Contexts;

public class StoreContext : DbContext
{
    public StoreContext(DbContextOptions<StoreContext> options) : base(options) { }

    // public DbSet<Product> Products { get; set; }
    // public required DbSet<Product> Products { get; set; }
    // public DbSet<Product> Products { get; set; } = null!
    // public DbSet<Product>? Products { get; set; }
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProductConfigurations).Assembly);
    }
}