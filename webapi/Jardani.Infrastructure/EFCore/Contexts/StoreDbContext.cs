using Jardani.Domain.Entities;
using Jardani.Infrastructure.EFCore.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Jardani.Infrastructure.EFCore.Contexts;

public class StoreDbContext : DbContext
{
    public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options) { }

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

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = DateTime.Now;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.Now;
                    break;
            }
        }
        return base.SaveChangesAsync(cancellationToken);
    }
}