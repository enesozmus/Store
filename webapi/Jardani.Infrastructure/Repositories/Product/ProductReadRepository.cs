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

    public async Task<IReadOnlyList<Product>> GetProductsAsync(string? brand, string? type, string? sort)
    {
        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(brand)) query = query.Where(x => x.Brand == brand);
        if (!string.IsNullOrWhiteSpace(type)) query = query.Where(x => x.Type == type);
        // if (!string.IsNullOrWhiteSpace(type))
        // {
        query = sort switch
        {
            "priceAsc" => query.OrderBy(x => x.Price),
            "priceDesc" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name),
        };
        // }

        return await query.ToListAsync();
    }

    public async Task<IReadOnlyList<string>> GetTypesAsync()
        => await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
}