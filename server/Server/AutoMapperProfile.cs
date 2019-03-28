using FinalProjectFileManager.Data.Entities;
using FinalProjectFileManager.Dtos;
using Profile = AutoMapper.Profile;

namespace FinalProjectFileManager
{
  public class AutoMapperProfile : Profile
  {
    public AutoMapperProfile()
    {
      CreateMap<StorageItemResponseDto, StorageItem>()
          .ForMember(dest => dest.IsFolder, opts => opts.Ignore())
          .ForMember(dest => dest.IsTrash, opts => opts.Ignore())
          .ForMember(dest => dest.Guid, opts => opts.Ignore());
    }
  }
}