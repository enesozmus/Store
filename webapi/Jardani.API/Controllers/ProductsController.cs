using Jardani.Application.IRepositories;
using Jardani.Domain.Entities;
using Jardani.Infrastructure.EFCore.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jardani.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly StoreDbContext _context;
    private readonly IProductReadRepository _productReadRepository;

    public ProductsController(StoreDbContext context, IProductReadRepository productReadRepository)
    {
        _context = context;
        _productReadRepository = productReadRepository;
    }

    [HttpGet("brands")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
        => Ok(await _productReadRepository.GetBrandsAsync());

    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
        => Ok(await _productReadRepository.GetTypesAsync());

    // [HttpGet("bybrands")]
    // public async Task<ActionResult<IReadOnlyList<string>>> GetProductsByBrands(string? brand, string? type)
    //     => Ok(await _productReadRepository.GetAsync(x => x.Brand == brand && x.Type == type));

    // [HttpGet]
    // public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
    //     => await _context.Products.ToListAsync();

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts(string? brand, string? type, string? sort)
        => Ok(await _productReadRepository.GetProductsAsync(brand, type, sort));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateProduct(int id, Product product)
    {
        if (product.Id != id || !ProductExists(id))
            return BadRequest("Cannot update this product");

        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return Ok();
    }

    private bool ProductExists(int id)
        => _context.Products.Any(x => x.Id == id);
}