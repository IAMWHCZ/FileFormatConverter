using FileFormatConverter.Domain.Entities;

namespace FileFormatConverter.Core.Interfaces;

/// <summary>
/// 文件转换关系服务接口
/// </summary>
public interface IFileSwitchRelationService
{
    /// <summary>
    /// 获取所有文件转换关系
    /// </summary>
    /// <returns>文件转换关系列表</returns>
    Task<IEnumerable<FileSwitchRelation>> GetAllRelationsAsync();

    /// <summary>
    /// 根据ID获取文件转换关系
    /// </summary>
    /// <param name="id">文件转换关系ID</param>
    /// <returns>文件转换关系对象，如果未找到则返回null</returns>
    Task<FileSwitchRelation?> GetRelationByIdAsync(long id);

    /// <summary>
    /// 创建新的文件转换关系
    /// </summary>
    /// <param name="relation">要创建的文件转换关系对象</param>
    /// <returns>创建后的文件转换关系对象</returns>
    Task<FileSwitchRelation> CreateRelationAsync(FileSwitchRelation relation);

    /// <summary>
    /// 删除文件转换关系
    /// </summary>
    /// <param name="id">要删除的文件转换关系ID</param>
    /// <returns>删除成功返回true，否则返回false</returns>
    Task<bool> DeleteRelationAsync(long id);

    /// <summary>
    /// 根据源文件类型ID获取文件转换关系列表
    /// </summary>
    /// <param name="sourceTypeId">源文件类型ID</param>
    /// <returns>文件转换关系列表</returns>
    Task<IEnumerable<FileSwitchRelation>> GetRelationsBySourceTypeIdAsync(long sourceTypeId);

    /// <summary>
    /// 根据目标文件类型ID获取文件转换关系列表
    /// </summary>
    /// <param name="targetTypeId">目标文件类型ID</param>
    /// <returns>文件转换关系列表</returns>
    Task<IEnumerable<FileSwitchRelation>> GetRelationsByTargetTypeIdAsync(long targetTypeId);

    /// <summary>
    /// 检查是否可以进行文件类型转换
    /// </summary>
    /// <param name="sourceType">源文件类型</param>
    /// <param name="targetType">目标文件类型</param>
    /// <returns>可以转换返回true，否则返回false</returns>
    Task<bool> CanConvertAsync(string sourceType, string targetType);
}