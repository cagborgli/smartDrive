using System;
using System.Collections.Generic;
using System.Linq;

using AutoMapper;

using FinalProjectFileManager.Data.Entities;
using FinalProjectFileManager.Dtos;
using FinalProjectFileManager.Services;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FinalProjectFileManager.Controllers
{
  [Route("api/files")]
  [ApiController]
  public class FileController : ControllerBase
  {
    private readonly IFileService _fileService;
    private readonly IValidationService _validationService;

    private readonly IMapper _mapper;

    private readonly ILogger _logger;

    public FileController(IFileService fileService, IValidationService validationService, IMapper mapper, ILogger<FileController> logger)
    {
      _fileService = fileService;
      _validationService = validationService;
      _mapper = mapper;
      _logger = logger;
    }
    
    [HttpGet]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public ActionResult<IEnumerable<StorageItemResponseDto>> Get(string ids)
    {
      var idList = new List<int>();
      if (ids != null)
      {
        foreach (var id in ids.Split(','))
        {
          int parsedId = 0;
          if (Int32.TryParse(id, out parsedId))
          {
            idList.Add(parsedId);
          }
        }
        idList = idList.Select(id => id).Distinct().ToList();
        return _mapper.Map<IEnumerable<StorageItem>, IEnumerable<StorageItemResponseDto>>(_fileService.GetByIds(idList.ToArray())).ToList();
      }
      else
      {
        return _mapper.Map<IEnumerable<StorageItem>, IEnumerable<StorageItemResponseDto>>(_fileService.GetAllFromRoot()).ToList();
      }
    }

    [HttpGet("{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public ActionResult<StorageItemResponseDto> GetOne(int id)
    {
      return _mapper.Map<StorageItem, StorageItemResponseDto>(_fileService.GetById(id));
    }

    [HttpPost]
    [DisableRequestSizeLimit]
    [ProducesResponseType(409)]
    [ProducesResponseType(201)]
    public ActionResult<IEnumerable<StorageItemResponseDto>> Post([FromBody] IEnumerable<CreateStorageItemDto> items)
    {
      _validationService.Validate(items);
      return _mapper.Map<IEnumerable<StorageItem>, IEnumerable<StorageItemResponseDto>>(_fileService.CreateFiles(items)).ToList();
    }

    [HttpPatch]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public ActionResult<IEnumerable<StorageItemResponseDto>> Update([FromBody] IEnumerable<UpdateStorageItemDto> items)
    {
      return _mapper.Map<IEnumerable<StorageItem>, IEnumerable<StorageItemResponseDto>>(_fileService.UpdateItems(items)).ToList();
    }

    [HttpDelete("/api/trash")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public ActionResult DeleteFiles([FromBody] List<int> ids)
    {
      _validationService.ValidateDelete(ids);
      _fileService.DeleteFiles(ids);
      return StatusCode(200);
    }

    [HttpDelete("/api/trash/{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public ActionResult DeleteFile(int id)
    {
      _validationService.ValidateDelete(id);
      _fileService.DeleteFile(id);
      return StatusCode(200);
    }

    [HttpGet("/api/trash")]
    [ProducesResponseType(200)]
    public ActionResult<IEnumerable<StorageItemResponseDto>> GetTrash()
    {
      return _mapper.Map<IEnumerable<StorageItem>, IEnumerable<StorageItemResponseDto>>(_fileService.GetAllFromTrash()).ToList();
    }

    [HttpGet("{id}/download")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public ActionResult<DownloadResponseDto> DownloadOne(int id)
    {
      return _fileService.Download(id);
    }
  }
}
