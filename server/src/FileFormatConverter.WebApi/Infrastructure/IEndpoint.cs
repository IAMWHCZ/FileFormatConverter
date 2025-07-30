namespace FileFormatConverter.WebApi.Infrastructure
{
    public interface IEndpoint
    {
        void MapEndpoint(IEndpointRouteBuilder app);
    }
}