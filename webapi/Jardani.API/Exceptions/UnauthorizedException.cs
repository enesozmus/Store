namespace Jardani.API.Exceptions;

public class UnauthorizedException : Exception
{
    public UnauthorizedException() : base("The request was not authorized.")
    {

    }

    public UnauthorizedException(string message) : base(message)
    {

    }
}