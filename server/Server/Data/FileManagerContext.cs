using FinalProjectFileManager.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinalProjectFileManager.Data
{
    public class FileManagerContext : DbContext
    {
        public DbSet<StorageItem> StorageItems { get; set; }
        
        public FileManagerContext(DbContextOptions<FileManagerContext> options)
            : base(options) 
        { }
    }
}