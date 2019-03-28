using System;
using System.Collections.Generic;
using System.Linq;

using FinalProjectFileManager.Api;
using FinalProjectFileManager.Data;
using FinalProjectFileManager.Data.Entities;
using FinalProjectFileManager.Dtos;
using FinalProjectFileManager.Exception.Exceptions;

using Microsoft.Extensions.Logging;

namespace FinalProjectFileManager.Services
{
  public class FileService : IFileService
  {
    private readonly FileManagerContext _context;

    private readonly ILogger<FileService> _logger;

    public StorageItem GetById(int id)
    {
      try
      {
        return _context.StorageItems.Single(f => f.Id == id);
      }
      catch
      {
        throw new ItemNotFoundException(id);
      }
    }

    public IEnumerable<StorageItem> GetByIds(IEnumerable<int> id)
    {
      var files = new List<StorageItem>();
      foreach (var i in id)
      {
        files.Add(GetById(i));
      }
      return files;
    }

    public IEnumerable<int> GetIdsByFolderId(int id)
    {
      return _context.StorageItems.Where(item => item.FolderId == id).Select(item => item.Id).ToList();
    }

    public StorageItem TrashItem(int id)
    {
      StorageItem itemToTrash = GetById(id);
      itemToTrash.IsTrash = true;
      _context.StorageItems.Update(itemToTrash);
      _context.SaveChanges();
      return itemToTrash;
    }

    public StorageItem UntrashItem(int id)
    {
      StorageItem itemToUntrash = GetById(id);
      itemToUntrash.IsTrash = false;
      _context.StorageItems.Update(itemToUntrash);
      _context.SaveChanges();
      return itemToUntrash;
    }

    public IEnumerable<StorageItem> UntrashItems(IEnumerable<int> ids)
    {
      var result = new List<StorageItem>();
      foreach (var id in ids)
      {
        result.Add(UntrashItem(id));
      }
      return result;
    }

    public StorageItem CreateFile(CreateStorageItemDto item)
    {
      var newItem = new StorageItem();
      newItem.Name = item.Name;
      newItem.FolderId = item.FolderId;
      newItem.IsFolder = item.IsFolder;
      newItem.Created = DateTime.Now;
      newItem.IsTrash = false;
      newItem.Size = item.Size;
      newItem.Type = item.Type;
      newItem.Guid = Guid.NewGuid().ToString();
      if (!newItem.IsFolder)
      {
        Files.WriteToFile(newItem.Guid, item.Data);
      }

      return newItem;
    }

    public IEnumerable<StorageItem> CreateFiles(IEnumerable<CreateStorageItemDto> items)
    {
      List<StorageItem> result = new List<StorageItem>();
      foreach (var item in items)
      {
        result.Add(CreateFile(item));
      }
      _context.StorageItems.AddRange(result);
      _context.SaveChanges();
      return result;
    }

    public void DeleteFile(int id)
    {
      var item = GetById(id);
      if (!item.IsFolder)
      {
        Files.DeleteFile(item.Guid);
      }
      _context.StorageItems.Remove(item);
      _context.SaveChanges();
    }

    public void DeleteFiles(IEnumerable<int> id)
    {
      foreach (var i in id)
      {
        DeleteFile(i);
      }
    }

    public DownloadResponseDto Download(int id)
    {
      var result = new DownloadResponseDto();
      var file = GetById(id);
      var data = Files.ReadFromFile(file.Guid);
      result.Data = data;
      result.Name = file.Name;
      result.Id = file.Id;
      result.Type = file.Type;
      return result;
    }

    public IEnumerable<DownloadResponseDto> Download(IEnumerable<int> ids)
    {
      var result = new List<DownloadResponseDto>();
      foreach (var id in ids)
      {
        var item = GetById(id);
        if (item.IsFolder)
        {
          result.AddRange(Download(GetIdsByFolderId(id)));
        }
        else
        {
          result.Add(Download(id));
        }
      }
      return result;
    }

    public IEnumerable<StorageItem> GetAllFromRoot()
    {
      return _context.StorageItems.Where(file => file.FolderId == 0 && !file.IsTrash).ToList();
    }

    public IEnumerable<StorageItem> GetAllFromTrash()
    {
      return _context.StorageItems.Where(item => item.IsTrash).ToList();
    }

    public StorageItem UpdateItem(UpdateStorageItemDto update)
    {
      var storageItem = GetById(update.Id);
      if (update.Data != null)
      {
        Files.WriteToFile(storageItem.Guid, update.Data);
      }

      // if (update.FolderId != -1)
      // {
      //   storageItem.FolderId = update.FolderId;
      // }

      // if (update.Name.Length > 0)
      // {
      //   storageItem.Name = update.Name;
      // }

      if (update.IsTrash)
      {
        storageItem.IsTrash = update.IsTrash;
      }

      if (!update.IsTrash)
      {
        storageItem.IsTrash = update.IsTrash;
      }

      return storageItem;
    }

    public IEnumerable<StorageItem> UpdateItems(IEnumerable<UpdateStorageItemDto> updates)
    {
      var result = new List<StorageItem>();
      foreach (var update in updates)
      {
        result.Add(UpdateItem(update));
      }
      _context.StorageItems.UpdateRange(result);
      _context.SaveChanges();
      return result;
    }

    public FileService(FileManagerContext context, ILogger<FileService> logger)
    {
      _context = context;
      _logger = logger;
    }
  }
}
