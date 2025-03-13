using Jardani.Application.IRepositories;
using Jardani.Domain.Entities;
using Jardani.Infrastructure.EFCore.Contexts;

namespace Jardani.Infrastructure.Repositories;

public class DeliveryMethodReadRepository : ReadRepository<DeliveryMethod>, IDeliveryMethodReadRepository
{
    public DeliveryMethodReadRepository(StoreDbContext context) : base(context) { }
}