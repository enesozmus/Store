using Jardani.Application.IRepositories;
using Jardani.Domain.Entities;
using Jardani.Infrastructure.EFCore.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Jardani.Infrastructure.Repositories;

public class ProductReadRepository : ReadRepository<Product>, IProductReadRepository
{
    private readonly StoreDbContext _context;

    public ProductReadRepository(StoreDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<string>> GetBrandsAsync()
        => await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();

    public async Task<IReadOnlyList<string>> GetTypesAsync()
        => await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
}