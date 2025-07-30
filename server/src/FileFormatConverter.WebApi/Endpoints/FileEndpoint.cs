using FileFormatConverter.WebApi.Infrastructure;

namespace FileFormatConverter.WebApi.Endpoints
{
    public class FileEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("", async () =>
            {

            });
        }
    }
}