using FileFormatConverter.Domain.Entities;

namespace FileFormatConverter.Domain.Interfaces;

/// <summary>
/// 支持的文件类型服务接口
/// </summary>
public interface ISupportFileTypeService
{
    /// <summary>
    /// 获取所有支持的文件类型
    /// </summary>
    /// <returns>支持的文件类型列表</returns>
    Task<IEnumerable<SupportFileType>> GetAllFileTypesAsync();

    /// <summary>
    /// 根据ID获取文件类型
    /// </summary>
    /// <param name="id">文件类型ID</param>
    /// <returns>文件类型对象，如果未找到则返回null</returns>
    Task<SupportFileType?> GetFileTypeByIdAsync(long id);

    /// <summary>
    /// 根据类型名称获取文件类型
    /// </summary>
    /// <param name="type">文件类型名称</param>
    /// <returns>文件类型对象，如果未找到则返回null</returns>
    Task<SupportFileType?> GetFileTypeByTypeAsync(string type);

    /// <summary>
    /// 创建新的文件类型
    /// </summary>
    /// <param name="fileType">要创建的文件类型对象</param>
    /// <returns>创建后的文件类型对象</returns>
    Task<SupportFileType> CreateFileTypeAsync(SupportFileType fileType);

    /// <summary>
    /// 更新文件类型
    /// </summary>
    /// <param name="fileType">要更新的文件类型对象</param>
    /// <returns>更新后的文件类型对象</returns>
    Task<SupportFileType> UpdateFileTypeAsync(SupportFileType fileType);

    /// <summary>
    /// 删除文件类型
    /// </summary>
    /// <param name="id">要删除的文件类型ID</param>
    /// <returns>删除成功返回true，否则返回false</returns>
    Task<bool> DeleteFileTypeAsync(long id);

    /// <summary>
    /// 获取源文件类型可以转换的目标文件类型列表
    /// </summary>
    /// <param name="sourceType">源文件类型</param>
    /// <returns>可以转换的目标文件类型列表</returns>
    Task<IEnumerable<SupportFileType>> GetTargetFileTypesAsync(string sourceType);
}