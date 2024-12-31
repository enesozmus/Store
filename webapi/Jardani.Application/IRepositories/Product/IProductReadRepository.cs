using Jardani.Domain.Entities;

namespace Jardani.Application.IRepositories;

public interface IProductReadRepository : IReadRepository<Product>
{
    Task<IReadOnlyList<string>> GetBrandsAsync();
    Task<IReadOnlyList<string>> GetTypesAsync();
}