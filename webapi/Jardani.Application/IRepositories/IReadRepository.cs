using System.Linq.Expressions;
using Jardani.Application.Specifications.Common;
using Jardani.Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;

namespace Jardani.Application.IRepositories;

public interface IReadRepository<T> : IRepository<T> where T : BaseEntity
{
    Task<IReadOnlyList<T>> GetAllAsync();

    Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate = null);
    Task<IReadOnlyList<T>> GetAsync(Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null, bool disableTracking = true);
    Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes);
    Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeString = null, bool disableTracking = true);
    Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, List<Expression<Func<T, object>>> includes = null, bool disableTracking = true);

    IQueryable<T> GetAllAsIQueryable();
    IQueryable<T> GetWhereAsIQueryable(Expression<Func<T, bool>> predicate);
    Task<IEnumerable<T>> GetByIdsAsync(IEnumerable<int> ids);


    Task<T> GetFirstAsync(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes);
    Task<T> GetByIdAsync(int id);
    Task<T> GetByIdAsyncWithIncludes(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null);
    Task<T> GetForMultipleKeys(params object[] keyValues);


    Task<int> CountAsync();
    Task<int> CountAsync(Expression<Func<T, bool>> predicate);

    bool Exists(int id);

    #region Specification Pattern

    Task<T?> GetSingleAsyncWithSpec(ISpecification<T> spec);
    Task<TResult?> GetSingleAsyncWithSpec<TResult>(ISpecification<T, TResult> spec);
    Task<IReadOnlyList<T>> GetListAsyncWithSpec(ISpecification<T> spec);
    Task<IReadOnlyList<TResult>> GetListAsyncWithSpec<TResult>(ISpecification<T, TResult> spec);
    Task<int> CountAsyncWithSpec(ISpecification<T> spec);

    #endregion
}