using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FinalProjectFileManager.Exception.Exceptions
{
    public class NameTakenException : BaseCustomException
    {
        public NameTakenException(string name) : base("Name taken", $"An item with the name '{name}' already exists", (int)HttpStatusCode.BadRequest)
        {
        }
    }

   
}
