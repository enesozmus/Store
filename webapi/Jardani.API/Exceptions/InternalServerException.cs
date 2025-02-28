namespace Jardani.API.Exceptions;

public class InternalServerException : Exception
{
    public InternalServerException() : base("Internal Server Error Occurred")
    {

    }

    public InternalServerException(string message) : base(message)
    {

    }
}