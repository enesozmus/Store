using Jardani.Application.IRepositories;
using Jardani.Domain.Entities;
using Jardani.Infrastructure.EFCore.Contexts;

namespace Jardani.Infrastructure.Repositories;

public class DeliveryMethodWriteRepository : WriteRepository<DeliveryMethod>, IDeliveryMethodWriteRepository
{
    public DeliveryMethodWriteRepository(StoreDbContext context) : base(context) { }
}