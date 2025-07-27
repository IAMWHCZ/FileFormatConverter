using System.ComponentModel.DataAnnotations.Schema;

namespace FileFormatConverter.Domain.Bases;

public class Entity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public DateTime LastModiftyTime { get; set; } = DateTime.UtcNow;
}