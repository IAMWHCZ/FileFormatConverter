using FileFormatConverter.Core.Interfaces;

namespace FileFormatConverter.Domain.Services;

public class FileSwitchRelationService(ApplicationDbContext context) : IFileSwitchRelationService
{
    public async Task<IEnumerable<FileSwitchRelation>> GetAllRelationsAsync()
    {
        return await context.Set<FileSwitchRelation>()
            .Include(r => r.FromFileType)
            .Include(r => r.ToFileType)
            .ToListAsync();
    }

    public async Task<FileSwitchRelation?> GetRelationByIdAsync(long id)
    {
        return await context.Set<FileSwitchRelation>()
            .Include(r => r.FromFileType)
            .Include(r => r.ToFileType)
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<FileSwitchRelation> CreateRelationAsync(FileSwitchRelation relation)
    {
        context.Set<FileSwitchRelation>().Add(relation);
        await context.SaveChangesAsync();
        return relation;
    }

    public async Task<bool> DeleteRelationAsync(long id)
    {
        var relation = await context.Set<FileSwitchRelation>().FindAsync(id);
        if (relation == null) return false;

        context.Set<FileSwitchRelation>().Remove(relation);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<FileSwitchRelation>> GetRelationsBySourceTypeIdAsync(long sourceTypeId)
    {
        return await context.Set<FileSwitchRelation>()
            .Include(r => r.FromFileType)
            .Include(r => r.ToFileType)
            .Where(r => r.FromFileTypeId == sourceTypeId)
            .ToListAsync();
    }

    public async Task<IEnumerable<FileSwitchRelation>> GetRelationsByTargetTypeIdAsync(long targetTypeId)
    {
        return await context.Set<FileSwitchRelation>()
            .Include(r => r.FromFileType)
            .Include(r => r.ToFileType)
            .Where(r => r.ToFileTypeId == targetTypeId)
            .ToListAsync();
    }

    public async Task<bool> CanConvertAsync(string sourceType, string targetType)
    {
        return await context.Set<FileSwitchRelation>()
            .Include(r => r.FromFileType)
            .Include(r => r.ToFileType)
            .AnyAsync(r => 
                r.FromFileType.Type.Equals(sourceType, StringComparison.OrdinalIgnoreCase) && 
                r.ToFileType.Type.Equals(targetType, StringComparison.OrdinalIgnoreCase));
    }
}
