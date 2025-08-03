using FileFormatConverter.Shared.Entities;

namespace FileFormatConverter.Domain.Services;

public class SupportFileTypeService(ApplicationDbContext context) : ISupportFileTypeService
{
    public async Task<IEnumerable<SupportFileType>> GetAllFileTypesAsync()
    {
        return await context.Set<SupportFileType>().ToListAsync();
    }

    public async Task<SupportFileType?> GetFileTypeByIdAsync(long id)
    {
        return await context.Set<SupportFileType>().FindAsync(id);
    }

    public async Task<SupportFileType?> GetFileTypeByTypeAsync(string type)
    {
        return await context.Set<SupportFileType>()
            .FirstOrDefaultAsync(x => x.Type.Equals(type, StringComparison.OrdinalIgnoreCase));
    }

    public async Task<SupportFileType> CreateFileTypeAsync(SupportFileType fileType)
    {
        context.Set<SupportFileType>().Add(fileType);
        await context.SaveChangesAsync();
        return fileType;
    }

    public async Task<SupportFileType> UpdateFileTypeAsync(SupportFileType fileType)
    {
        context.Set<SupportFileType>().Update(fileType);
        await context.SaveChangesAsync();
        return fileType;
    }

    public async Task<bool> DeleteFileTypeAsync(long id)
    {
        var fileType = await context.Set<SupportFileType>().FindAsync(id);
        if (fileType == null) return false;

        context.Set<SupportFileType>().Remove(fileType);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<SupportFileType>> GetTargetFileTypesAsync(string sourceType)
    {
        var sourceFileType = await context.Set<SupportFileType>()
            .Include(sft => sft.RelationSupportFileTypes)
            .FirstOrDefaultAsync(sft => sft.Type.Equals(sourceType, StringComparison.OrdinalIgnoreCase));

        return sourceFileType == null ? [] : sourceFileType.RelationSupportFileTypes;
    }
}