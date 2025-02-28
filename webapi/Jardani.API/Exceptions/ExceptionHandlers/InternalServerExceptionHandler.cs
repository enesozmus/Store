using Jardani.API.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

internal sealed class InternalServerExceptionHandler : IExceptionHandler
{
    private readonly ILogger<InternalServerExceptionHandler> _logger;

    public InternalServerExceptionHandler(ILogger<InternalServerExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is not InternalServerException internalServerException)
        {
            return false;
        }

        _logger.LogError(internalServerException, "Exception occurred: {Message}", internalServerException.Message);

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Type = internalServerException.GetType().Name,
            Title = "Internal Server Error",
            Detail = internalServerException.StackTrace,
            // Detail = exception.Message,
            Instance = $"{httpContext.Request.Method} {httpContext.Request.Path}",
        };
        httpContext.Response.StatusCode = problemDetails.Status.Value;
        
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true;
    }
}