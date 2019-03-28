using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProjectFileManager.Data.Entities
{
  public class StorageItem
  {
    public int Id
    {
      get;
      set;
    }
    // Lucas Jenkins - Declared Name as required
    [Required]
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

    public int Size
    {
      get;
      set;
    }

    public string Guid
    {
      get;
      set;
    }

    public Boolean IsTrash
    {
      get;
      set;
    }

    public Boolean IsFolder
    {
      get;
      set;
    }
    // Lucas Jenkins - Declared folderId as a foreignKey
    [ForeignKey("StorageItem")]
    public int FolderId
    {
      get;
      set;
    }
  }

}
