using System;

namespace FinalProjectFileManager.Dtos
{
    public class CreateStorageItemDto
    {
        public string Name
        {
            get;
            set;
        }

        public int FolderId
        {
            get;
            set;
        } = 0;

        public bool IsFolder
        {
            get;
            set;
        }

        public string Data
        {
            get;
            set;
        }

        public string Type
        {
            get;
            set;
        }

        public int Size
        {
            get;
            set;
        }
    }
}
