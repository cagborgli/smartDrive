using System.Net;

namespace FinalProjectFileManager.Exception.Exceptions
{
    public class BadRequestCustomException: BaseCustomException
    {
        public BadRequestCustomException(string description) : base("Bad request", description, (int)HttpStatusCode.BadRequest)
        {
        }
    }
}