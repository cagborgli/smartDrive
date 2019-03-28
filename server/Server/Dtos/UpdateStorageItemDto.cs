using System;

namespace FinalProjectFileManager.Dtos
{
  public class UpdateStorageItemDto
  {
    public int Id
    {
      get;
      set;
    } = -1;
    public string Name
    {
      get;
      set;
    }
    public int FolderId
    {
      get;
      set;
    } = -1;
    public string Data
    {
      get;
      set;
    }
    public bool IsTrash
    {
      get;
      set;
    }
  }
}
