using FileFormatConverter.Domain.Bases;

namespace FileFormatConverter.Shared.Entities;

public class SupportFileType:Entity
{
    public string Type { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ICollection<SupportFileType> RelationSupportFileTypes { get; set; } = [];
}