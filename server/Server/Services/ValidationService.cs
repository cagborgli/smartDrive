using System;
using System.Collections.Generic;
using System.Linq;

using FinalProjectFileManager.Data;
using FinalProjectFileManager.Data.Entities;
using FinalProjectFileManager.Dtos;
using FinalProjectFileManager.Exception.Exceptions;
using FinalProjectFileManager.Services;

using Microsoft.Extensions.Logging;

namespace FinalProjectFileManager.Services
{
  public class ValidationService : IValidationService
  {
    private readonly FileManagerContext _context;

    private readonly ILogger<ValidationService> _logger;

    public ValidationService(ILogger<ValidationService> logger, FileManagerContext context)
    {
      _context = context;
      _logger = logger;
    }

    private void EnsureExists(int id)
    {
      if (_context.StorageItems.Count(item => item.Id == id) == 0)
      {
        throw new ItemNotFoundException(id);
      }
    }

    private void EnsureIsInTrash(int id)
    {
      if (_context.StorageItems.Count(item => item.Id == id && item.IsTrash == true) == 0)
      {
        throw new BadRequestCustomException($"Item '{id}' is not in trash.");
      }
    }

    private bool NameExistsInFolder(string name, int folderId)
    {
      return _context.StorageItems.Count(item => item.Name == name && item.FolderId == folderId) > 0;
    }

    private bool ItemIsFolder(int folderId)
    {
      return _context.StorageItems.Count(item => item.Id == folderId && item.IsFolder == true) == 1 || folderId == 0;
    }
    public void Validate(CreateStorageItemDto storageItem)
    {
      Console.WriteLine(storageItem);
      //Request Validation
      if (storageItem == null)
      {
        throw new BadRequestCustomException("Request body cannot be empty");
      }
      if (storageItem.IsFolder && storageItem.Data != null)
      {
        throw new BadRequestCustomException("Folder cannot contain data");
      }

      if (!storageItem.IsFolder && storageItem.Data == null)
      {
        throw new BadRequestCustomException("File must contain data");
      }

      if (storageItem.Name == null || storageItem.Name.Length == 0)
      {
        throw new BadRequestCustomException("Item must have a name");
      }

      //Operation Validation
      if (NameExistsInFolder(storageItem.Name, storageItem.FolderId))
      {
        throw new NameTakenException(storageItem.Name);
      }

      if (!ItemIsFolder(storageItem.FolderId))
      {
        throw new BadRequestCustomException($"Id {storageItem.FolderId} is not a folder");
      }
    }

    public void Validate(IEnumerable<CreateStorageItemDto> storageItems)
    {
      foreach (var item in storageItems)
      {
        Validate(item);
      }
    }

    public void Validate(UpdateStorageItemDto itemUpdate)
    {
      if (itemUpdate == null)
      {
        throw new BadRequestCustomException("Request body cannot be empty");
      }
      if (itemUpdate.Id == -1)
      {
        throw new BadRequestCustomException("Request must have an associated item id.");
      }

      EnsureExists(itemUpdate.Id);

      if (ItemIsFolder(itemUpdate.Id) && itemUpdate.Data != null)
      {
        throw new BadRequestCustomException("Folder cannot contain data");
      }

      if (itemUpdate.Name != null && itemUpdate.Name.Length == 0)
      {
        throw new BadRequestCustomException("Item must have a name");
      }

      //Operation Validation
      if (NameExistsInFolder(itemUpdate.Name, itemUpdate.FolderId))
      {
        throw new NameTakenException(itemUpdate.Name);
      }

      if (!ItemIsFolder(itemUpdate.FolderId))
      {
        throw new BadRequestCustomException($"Id {itemUpdate.FolderId} is not a folder");
      }

    }

    public void Validate(IEnumerable<UpdateStorageItemDto> itemUpdates)
    {
      foreach (var update in itemUpdates)
      {
        Validate(update);
      }
    }
    public void ValidateDelete(int id)
    {
      EnsureExists(id);
      EnsureIsInTrash(id);
    }

    public void ValidateDelete(IEnumerable<int> ids)
    {
      foreach (var id in ids)
      {
        ValidateDelete(id);
      }
    }
  }
}
