using System.Reflection;
using FileFormatConverter.WebApi.Infrastructure;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace FileFormatConverter.WebApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddEndpoints(
    this IServiceCollection services,
    Assembly assembly)
    {
        ServiceDescriptor[] serviceDescriptors = [.. assembly
            .DefinedTypes
            .Where(type => type is { IsAbstract: false, IsInterface: false } &&
                           type.IsAssignableTo(typeof(IEndpoint)))
            .Select(type => ServiceDescriptor.Transient(typeof(IEndpoint), type))];

        services.TryAddEnumerable(serviceDescriptors);

        return services;
    }
}