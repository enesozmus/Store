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
        => throw new BadRequestException("Not a good request. (TEST) (TEST) (TEST) (Jardani)");

    [HttpGet("notfound")]
    public IActionResult GetNotFound()
        // => NotFound();
        => throw new NotFoundException();

    [HttpGet("internalerror")]
    public IActionResult GetInternalError()
        => throw new Exception("This is a test exception. (TEST) (TEST) (TEST) (Jardani)");
}