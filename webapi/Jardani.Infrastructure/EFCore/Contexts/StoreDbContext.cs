using Jardani.Domain.Entities;
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
}