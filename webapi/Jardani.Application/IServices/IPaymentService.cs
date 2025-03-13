using Jardani.Domain.Entities;

namespace Jardani.Application.IServices;

public interface IPaymentService
{
    Task<ShoppingCart?> CreateOrUpdatePaymentIntent(string cartId);
}