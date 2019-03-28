using System;

namespace FinalProjectFileManager.Dtos
{
    public class StorageItemResponseDto
    {
        public int Id
        {
            get;
            set;
        }

        public string Name
        {
            get;
            set;
        }

        public DateTime Created
        {
            get;
            set;
        }

        public string Type
        {
            get;
            set;
        }

        public string Size
        {
            get;
            set;
        }

        public int FolderId
        {
            get;
            set;
        }
    }
}
