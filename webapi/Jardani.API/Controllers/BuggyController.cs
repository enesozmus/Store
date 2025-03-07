using System.Security.Claims;
using Jardani.API.DTOs;
using Jardani.API.Exceptions;
using Jardani.Domain.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jardani.API.Controllers;

// [Authorize]
public class BuggyController : BaseApiController
{

    [HttpGet("unauthorized")]
    public IActionResult GetUnauthorized()
        // => Unauthorized();
        => throw new UnauthorizedException();

    // [AllowAnonymous]
    [HttpGet("badrequest")]
    public IActionResult GetBadRequest()
        // => BadRequest("Not a good request");
        => throw new BadRequestException("Not a good request.");

    [HttpGet("notfound")]
    public IActionResult GetNotFound()
        // => NotFound();
        => throw new NotFoundException();

    [HttpGet("internalerror")]
    public IActionResult GetInternalError()
        // => throw new Exception("This is a test exception.");
        => throw new InternalServerException();

    [HttpPost("validationerror")]
    public IActionResult GetValidationError(CreateProductDto product)
        => Ok();

    [Authorize]
    [HttpGet("secret")]
    public IActionResult GetSecret()
    {
        var name = User.FindFirst(ClaimTypes.Name)?.Value;
        var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        return Ok("Hello " + name + " with the id of " + id);
    }
}