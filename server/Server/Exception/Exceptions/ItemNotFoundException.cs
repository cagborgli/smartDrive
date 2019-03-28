namespace FinalProjectFileManager.Exception.Exceptions
{
    public class ItemNotFoundException : NotFoundCustomException
    {

        public ItemNotFoundException() : base ("Item not found", "Item not found.")
        {
        }

        
        
        public ItemNotFoundException(string message, string description) : base(message, description)
        {
        }

        public ItemNotFoundException(int id) : base("Item not found.", $"Item id {id} not found.") {}
    }
}