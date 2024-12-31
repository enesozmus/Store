using Jardani.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Jardani.Application.IRepositories;

public interface IRepository<T> where T : BaseEntity
{
    DbSet<T> Table { get; }
    IQueryable<T> TableNoTracking { get; }
}