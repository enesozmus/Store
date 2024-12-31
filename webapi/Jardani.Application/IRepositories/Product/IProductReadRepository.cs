using Jardani.Domain.Entities;

namespace Jardani.Application.IRepositories;

public interface IProductReadRepository : IReadRepository<Product>
{
    Task<IReadOnlyList<Product>> GetProductsAsync(string? brand, string? type, string? sort);
    Task<IReadOnlyList<string>> GetBrandsAsync();
    Task<IReadOnlyList<string>> GetTypesAsync();
}