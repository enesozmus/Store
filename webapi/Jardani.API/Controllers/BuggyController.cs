using System.ComponentModel.DataAnnotations;
using Jardani.API.Exceptions;
using Jardani.Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace Jardani.API.Controllers;

public class BuggyController : BaseApiController
{
    [HttpGet("unauthorized")]
    public IActionResult GetUnauthorized()
        // => Unauthorized();
        => throw new UnauthorizedException();

    [HttpGet("badrequest")]
    public IActionResult GetBadRequest()
        // => BadRequest("Not a good request");
        => throw new BadRequestException("Not a good request. Status:400 (TEST) (TEST) (TEST)");

    [HttpGet("notfound")]
    public IActionResult GetNotFound()
        // => NotFound();
        => throw new NotFoundException();

    [HttpGet("internalerror")]
    public IActionResult GetInternalError()
        => throw new Exception("This is a test exception. (TEST) (TEST) (TEST)");

    [HttpPost("validationerror")]
    public IActionResult GetValidationError(CreateProductDto product)
        => Ok();
}

// TEST
public class CreateProductDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
    public decimal Price { get; set; }

    [Required]
    public string PictureUrl { get; set; } = string.Empty;

    [Required]
    public string Type { get; set; } = string.Empty;

    [Required]
    public string Brand { get; set; } = string.Empty;

    [Range(1, int.MaxValue, ErrorMessage = "Quantity in stock must be at least 1")]
    public int QuantityInStock { get; set; }
}