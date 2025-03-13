using Jardani.Domain.Entities;
using Jardani.Infrastructure.EFCore.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Jardani.Infrastructure.EFCore.Contexts;

public class StoreDbContext : IdentityDbContext<AppUser>
{
    public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options) { }

    // public DbSet<Product> Products { get; set; }
    // public required DbSet<Product> Products { get; set; }
    // public DbSet<Product> Products { get; set; } = null!
    // public DbSet<Product>? Products { get; set; }
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Address> Addresses => Set<Address>();
    public DbSet<DeliveryMethod> DeliveryMethods => Set<DeliveryMethod>();

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