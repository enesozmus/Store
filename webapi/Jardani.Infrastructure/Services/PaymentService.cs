using Jardani.Application.IServices;
using Jardani.Domain.Entities;

namespace Jardani.Infrastructure.Services;

public class PaymentService : IPaymentService
{
    public Task<ShoppingCart?> CreateOrUpdatePaymentIntent(string cartId)
    {
        throw new NotImplementedException();
    }
}