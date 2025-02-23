using Jardani.Application.IRepositories;
using Jardani.Application.Specifications;
using Jardani.Application.Specifications.Params;
using Jardani.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Jardani.API.Controllers;

// [ApiController]
// [Route("api/[controller]")]
public class ProductsController : BaseApiController
{
    // private readonly StoreDbContext _context;
    private readonly IProductReadRepository _productReadRepository;
    private readonly IProductWriteRepository _productWriteRepository;

    public ProductsController(IProductReadRepository productReadRepository, IProductWriteRepository productWriteRepository)
    {
        // _context = context;
        _productReadRepository = productReadRepository;
        _productWriteRepository = productWriteRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery] ProductSpecParams specParams)
    {
        var spec = new ProductSpecification(specParams);

        return await CreatePagedResult(_productReadRepository, spec, specParams.PageIndex, specParams.PageSize);
    }

    // [HttpGet("bybrands")]
    // public async Task<ActionResult<IReadOnlyList<string>>> GetProductsByBrands(string? brand, string? type)
    //     => Ok(await _productReadRepository.GetAsync(x => x.Brand == brand && x.Type == type));

    // [HttpGet]
    // public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
    //     => await _context.Products.ToListAsync();

    // [HttpGet]
    // public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts(string? brand, string? type, string? sort)
    //     => Ok(await _productReadRepository.GetProductsAsync(brand, type, sort));

    // [HttpGet]
    // public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery] ProductSpecParams productParams)
    //     => Ok(await _productReadRepository.GetListAsyncWithSpec(new ProductSpecification(productParams)));

    [HttpGet("{id:int}")] // api/products/2
    public async Task<ActionResult<Product>> GetProduct(int id)
        => await _productReadRepository.GetByIdAsync(id);
    // {
        // var product = await _context.Products.FindAsync(id);
        // var product = await _productReadRepository.GetByIdAsync(id);
        // if (product == null) return NotFound();
        // return product;
    // }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        // _context.Products.Add(product);
        // await _context.SaveChangesAsync();
        // return product;
        await _productWriteRepository.AddAsync(product);
        return CreatedAtAction("GetProduct", new { id = product.Id }, product);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateProduct(int id, Product product)
    {
        if (product.Id != id || !ProductExists(id))
            return BadRequest("Cannot update this product");

        // _context.Entry(product).State = EntityState.Modified;
        // await _context.SaveChangesAsync();
        await _productWriteRepository.UpdateAsync(product);
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        // var product = await _context.Products.FindAsync(id);
        var product = await _productReadRepository.GetByIdAsync(id);
        if (product == null) return NotFound();

        // _context.Products.Remove(product);
        // await _context.SaveChangesAsync();
        await _productWriteRepository.RemoveAsync(product);
        return Ok();
    }


    [HttpGet("brands")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
        // => Ok(await _productReadRepository.GetBrandsAsync());
        // => Ok(await _context.Products.Select(x => x.Brand).Distinct().ToListAsync());
        => Ok(await _productReadRepository.GetListAsyncWithSpec(new BrandListSpecification()));

    [HttpGet("colors")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetColors()
        => Ok(await _productReadRepository.GetListAsyncWithSpec(new ColorListSpecification()));

    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
        // => Ok(await _productReadRepository.GetTypesAsync());
        => Ok(await _productReadRepository.GetListAsyncWithSpec(new TypeListSpecification()));


    private bool ProductExists(int id)
        // => _context.Products.Any(x => x.Id == id);
        => _productReadRepository.Exists(id);
}