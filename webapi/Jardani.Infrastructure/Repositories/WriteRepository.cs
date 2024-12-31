using Jardani.Application.IRepositories;
using Jardani.Domain.Entities;
using Jardani.Infrastructure.EFCore.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Jardani.Infrastructure.Repositories;

public class WriteRepository<T> : IWriteRepository<T> where T : BaseEntity
{
    private readonly StoreDbContext _context;

    public WriteRepository(StoreDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }


    public DbSet<T> Table => _context.Set<T>();
    public IQueryable<T> TableNoTracking => _context.Set<T>().AsNoTracking();


    public async Task<int> SaveAsync() => await _context.SaveChangesAsync();


    public async Task<T> AddAsync(T entity)
    {
        _context.Set<T>().Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task AddRangeAsync(IEnumerable<T> entities)
    {
        await _context.Set<T>().AddRangeAsync(entities);
        await _context.SaveChangesAsync();
    }


    public async Task UpdateAsync(T entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task UpdateRangeAsync(IEnumerable<T> entities)
    {
        _context.Entry(entities).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }


    public async Task RemoveAsync(T entity)
    {
        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveRangeAsync(IEnumerable<T> entities)
    {
        _context.Set<T>().RemoveRange(entities);
        await _context.SaveChangesAsync();
    }
}