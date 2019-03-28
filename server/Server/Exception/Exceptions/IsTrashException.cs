namespace FinalProjectFileManager.Exception.Exceptions
{
    public class IsTrashException : ForbiddenCustomException
    {
        public IsTrashException() : this("File is in trash", "Can't update files in trash")
        {
        }

        private IsTrashException(string message, string description) : base(message, description)
        {
        }
    }
}