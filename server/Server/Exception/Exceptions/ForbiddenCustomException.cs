using System.Net;

namespace FinalProjectFileManager.Exception.Exceptions
{
    public class ForbiddenCustomException : BaseCustomException
    {
        public ForbiddenCustomException(string message, string description) : base(message, description, (int)HttpStatusCode.Forbidden)
        {
        }
    }
}