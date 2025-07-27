using FileFormatConverter.WebApi.Extensions;
using FileFormatConverter.WebApi.Infrastructure;
using Scalar.AspNetCore;
using Serilog;


var builder = WebApplication.CreateBuilder(args);

builder.ApplySerilog();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapScalarApiReference();
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseSerilogRequestLogging(options =>
{
    options.EnrichDiagnosticContext = (diagCtx, httpCtx) =>
    {
        if (httpCtx.Request.Host.Value != null) diagCtx.Set("RequestHost", httpCtx.Request.Host.Value);
        diagCtx.Set("RequestScheme", httpCtx.Request.Scheme);
        diagCtx.Set("User", httpCtx.User.Identity?.Name ?? "anonymous");
    };
});

builder.LogStartupInfo();

await app.RunAsync();