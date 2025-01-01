using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Jardani.API.Exceptions.ExceptionHandlers;

internal sealed class UnauthorizedExceptionHandler : IExceptionHandler
{
    private readonly ILogger<UnauthorizedExceptionHandler> _logger;

    public UnauthorizedExceptionHandler(ILogger<UnauthorizedExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is not UnauthorizedException unauthorizedException)
        {
            return false;
        }

        _logger.LogError(unauthorizedException, "Exception occurred: {Message}", unauthorizedException.Message);

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status401Unauthorized,
            Type = unauthorizedException.GetType().Name,
            Title = "Unauthorized Request",
            Detail = unauthorizedException.Message,
            Instance = $"{httpContext.Request.Method} {httpContext.Request.Path}"
        };

        httpContext.Response.StatusCode = problemDetails.Status.Value;
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true;
    }
}