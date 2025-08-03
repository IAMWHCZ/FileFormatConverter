using FileFormatConverter.Domain.Bases;

namespace FileFormatConverter.Shared.Entities;

public class FileSwitchRelation:Entity
{
    public long ToFileTypeId { get; set; }

    public long FromFileTypeId { get; set; }

    public virtual SupportFileType ToFileType { get; set; } = null!;

    public virtual SupportFileType FromFileType { get; set; } = null!;
}