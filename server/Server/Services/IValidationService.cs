using System.Collections.Generic;
using FinalProjectFileManager.Data.Entities;
using FinalProjectFileManager.Dtos;

namespace FinalProjectFileManager.Services
{
  public interface IValidationService
  {
    void Validate (CreateStorageItemDto storageItem);

    void Validate (IEnumerable<CreateStorageItemDto> storageItems);

    void Validate (UpdateStorageItemDto itemUpdate);

    void Validate (IEnumerable<UpdateStorageItemDto> itemUpdates);

    void ValidateDelete (int id);
    void ValidateDelete (IEnumerable<int> ids);

  }
}