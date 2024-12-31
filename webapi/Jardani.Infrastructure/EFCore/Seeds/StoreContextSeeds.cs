using System.Text.Json;
using Jardani.Domain.Entities;
using Jardani.Infrastructure.EFCore.Contexts;

namespace Jardani.Infrastructure.EFCore.Seeds;

public class StoreContextSeeds
{
    public static async Task SeedAsync(StoreDbContext context)
    {
        // var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

        if (!context.Products.Any())
        {
            var productsData = await File.ReadAllTextAsync("../Jardani.Infrastructure/EFCore/Seeds/products.json");

            var products = JsonSerializer.Deserialize<List<Product>>(productsData);

            if (products == null) return;

            context.Products.AddRange(products);

            await context.SaveChangesAsync();
        }
    }
}
