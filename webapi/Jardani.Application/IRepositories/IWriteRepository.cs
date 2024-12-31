using Jardani.Domain.Entities;

namespace Jardani.Application.IRepositories;

public interface IWriteRepository<T> : IRepository<T> where T : BaseEntity
{
    Task<T> AddAsync(T entity);
    Task AddRangeAsync(IEnumerable<T> entities);

    Task UpdateAsync(T entity);
    Task UpdateRangeAsync(IEnumerable<T> entities);

    Task RemoveAsync(T entity);
    Task RemoveRangeAsync(IEnumerable<T> entities);

    Task<int> SaveAsync();
}