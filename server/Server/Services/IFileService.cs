using System.Collections.Generic;

using FinalProjectFileManager.Data.Entities;
using FinalProjectFileManager.Dtos;

namespace FinalProjectFileManager.Services
{
  public interface IFileService
  {
    IEnumerable<StorageItem> GetByIds(IEnumerable<int> id);

    StorageItem GetById(int id);

    StorageItem UpdateItem(UpdateStorageItemDto update);
    IEnumerable<StorageItem> UpdateItems(IEnumerable<UpdateStorageItemDto> updates);
    StorageItem TrashItem(int id);
    StorageItem UntrashItem(int id);

    IEnumerable<StorageItem> UntrashItems(IEnumerable<int> ids);
    StorageItem CreateFile(CreateStorageItemDto file);

    DownloadResponseDto Download(int id);

    IEnumerable<DownloadResponseDto> Download(IEnumerable<int> ids);

    void DeleteFiles(IEnumerable<int> ids);
    void DeleteFile(int id);

    IEnumerable<StorageItem> CreateFiles(IEnumerable<CreateStorageItemDto> files);
    IEnumerable<StorageItem> GetAllFromRoot();

    IEnumerable<StorageItem> GetAllFromTrash();
  }
}
