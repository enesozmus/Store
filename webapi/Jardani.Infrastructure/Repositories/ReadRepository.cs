using System.Linq.Expressions;
using Jardani.Application.IRepositories;
using Jardani.Application.Specifications.Common;
using Jardani.Domain.Entities;
using Jardani.Domain.Exceptions;
using Jardani.Infrastructure.EFCore.Contexts;
using Jardani.Infrastructure.Specifications;
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


    // public async Task<T> GetByIdAsync(int id)
    //      => await _context.Set<T>().FindAsync(id);

    public async Task<T> GetByIdAsync(int id)
    {
        var entity = await _context.Set<T>().FindAsync(id);
        if (entity == null) throw new NotFoundException($"{typeof(T).Name} not found with id: {id} (TEST) (TEST) (TEST) (Jardani)");
        return entity;
    }

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


    public bool Exists(int id)
        => _context.Set<T>().Any(x => x.Id == id);


    #region Specification Pattern
    public async Task<T?> GetSingleAsyncWithSpec(ISpecification<T> spec)
        => await ApplySpecification(spec).FirstOrDefaultAsync();

    public async Task<TResult?> GetSingleAsyncWithSpec<TResult>(ISpecification<T, TResult> spec)
        => await ApplySpecification(spec).FirstOrDefaultAsync();

    public async Task<IReadOnlyList<T>> GetListAsyncWithSpec(ISpecification<T> spec)
        => await ApplySpecification(spec).ToListAsync();

    public async Task<IReadOnlyList<TResult>> GetListAsyncWithSpec<TResult>(ISpecification<T, TResult> spec)
        => await ApplySpecification(spec).ToListAsync();

    public async Task<int> CountAsyncWithSpec(ISpecification<T> spec)
    {
        IQueryable<T> query = TableNoTracking;

        query = spec.ApplyCriteria(query);

        return await query.CountAsync();
    }
    #endregion

    #region Apply Specifications
    private IQueryable<T> ApplySpecification(ISpecification<T> spec)
    => SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);


    private IQueryable<TResult> ApplySpecification<TResult>(ISpecification<T, TResult> spec)
        => SpecificationEvaluator<T>.GetQuery<T, TResult>(_context.Set<T>().AsQueryable(), spec);
    #endregion
}