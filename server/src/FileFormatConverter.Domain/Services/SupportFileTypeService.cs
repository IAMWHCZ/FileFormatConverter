namespace FileFormatConverter.Domain.Services;

public class SupportFileTypeService : ISupportFileTypeService
{
    private readonly ApplicationDbContext _context;

    public SupportFileTypeService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<SupportFileType>> GetAllFileTypesAsync()
    {
        return await _context.Set<SupportFileType>().ToListAsync();
    }

    public async Task<SupportFileType?> GetFileTypeByIdAsync(long id)
    {
        return await _context.Set<SupportFileType>().FindAsync(id);
    }

    public async Task<SupportFileType?> GetFileTypeByTypeAsync(string type)
    {
        return await _context.Set<SupportFileType>()
            .FirstOrDefaultAsync(x => x.Type.Equals(type, StringComparison.OrdinalIgnoreCase));
    }

    public async Task<SupportFileType> CreateFileTypeAsync(SupportFileType fileType)
    {
        _context.Set<SupportFileType>().Add(fileType);
        await _context.SaveChangesAsync();
        return fileType;
    }

    public async Task<SupportFileType> UpdateFileTypeAsync(SupportFileType fileType)
    {
        _context.Set<SupportFileType>().Update(fileType);
        await _context.SaveChangesAsync();
        return fileType;
    }

    public async Task<bool> DeleteFileTypeAsync(long id)
    {
        var fileType = await _context.Set<SupportFileType>().FindAsync(id);
        if (fileType == null) return false;

        _context.Set<SupportFileType>().Remove(fileType);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<SupportFileType>> GetTargetFileTypesAsync(string sourceType)
    {
        var sourceFileType = await _context.Set<SupportFileType>()
            .Include(sft => sft.RelationSupportFileTypes)
            .FirstOrDefaultAsync(sft => sft.Type.Equals(sourceType, StringComparison.OrdinalIgnoreCase));

        return sourceFileType == null ? [] : sourceFileType.RelationSupportFileTypes;
    }
}