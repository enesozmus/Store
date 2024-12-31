using System.Linq.Expressions;
using Jardani.Application.IRepositories;
using Jardani.Domain.Entities;
using Jardani.Infrastructure.EFCore.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Jardani.Infrastructure.Repositories;

public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
{
    private readonly StoreDbContext _context;

    public ReadRepository(StoreDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public DbSet<T> Table => _context.Set<T>();
    public IQueryable<T> TableNoTracking => _context.Set<T>().AsNoTracking();

    // track etmeden IReadOnlyList olarak getir
    public async Task<IReadOnlyList<T>> GetAllAsync()
        => await TableNoTracking.ToListAsync();

    // track etmeden bir şarta bağlı IReadOnlyList olarak getir
    public async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate = null)
        => await TableNoTracking.Where(predicate).ToListAsync();

    // track etmeden include'larıyla birlikte IReadOnlyList olarak getir
    public async Task<IReadOnlyList<T>> GetAsync(Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null, bool disableTracking = true)
    {
        IQueryable<T> query = TableNoTracking;

        if (disableTracking) query = query.AsNoTracking();

        if (include != null) query = include(query);

        return await query.AsNoTracking().ToListAsync();
    }

    // track etmeden include'larıyla birlikte ve bir şarta bağlı IReadOnlyList olarak getir
    public async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes)
    {
        IQueryable<T> query = TableNoTracking;

        if (includes != null) query = includes.Aggregate(query, (current, include) => current.Include(include));

        if (predicate != null) query = query.Where(predicate);

        return await query.AsNoTracking().ToListAsync();
    }

    public async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeString = null, bool disableTracking = true)
    {
        IQueryable<T> query = TableNoTracking;

        if (disableTracking) query = query.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(includeString)) query = query.Include(includeString);

        if (predicate != null) query = query.Where(predicate);

        if (orderBy != null)
            return await orderBy(query).ToListAsync();
        return await query.ToListAsync();
    }

    public async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, List<Expression<Func<T, object>>> includes = null, bool disableTracking = true)
    {
        IQueryable<T> query = TableNoTracking;

        if (disableTracking) query = query.AsNoTracking();

        if (includes != null) query = includes.Aggregate(query, (current, include) => current.Include(include));

        if (predicate != null) query = query.Where(predicate);

        if (orderBy != null)
            return await orderBy(query).ToListAsync();
        return await query.ToListAsync();
    }

    public async Task<IEnumerable<T>> GetByIdsAsync(IEnumerable<int> ids)
          => await _context.Set<IEnumerable<T>>().FindAsync(ids);

    // track ederek IQueryable olarak getir
    public IQueryable<T> GetAllAsIQueryable()
         => TableNoTracking;

    // track ederek bir şarta bağlı IQueryable olarak getir
    public IQueryable<T> GetWhereAsIQueryable(Expression<Func<T, bool>> predicate)
         => TableNoTracking.Where(predicate);


    public async Task<T> GetByIdAsync(int id)
         => await _context.Set<T>().FindAsync(id);

    public async Task<T> GetByIdAsyncWithIncludes(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null)
    {
        IQueryable<T> query = Table;

        if (include != null) query = include(query);

        if (predicate != null) query = query.Where(predicate);

        return await query.AsNoTracking().FirstOrDefaultAsync();
    }

    public async Task<T> GetFirstAsync(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes)
    {
        IQueryable<T> query = Table;

        if (includes != null) query = includes.Aggregate(query, (current, include) => current.Include(include));

        if (predicate != null) query = query.Where(predicate);

        return await query.AsNoTracking().FirstOrDefaultAsync();
    }

    public async Task<T> GetForMultipleKeys(params object[] keyValues)
         => await _context.Set<T>().FindAsync(keyValues);


    public async Task<int> CountAsync()
         => await _context.Set<T>().CountAsync();

    public async Task<int> CountAsync(Expression<Func<T, bool>> predicate)
          => await _context.Set<T>().CountAsync(predicate);
}