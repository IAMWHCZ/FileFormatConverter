using System.Reflection;
using Serilog;
using Serilog.Enrichers.Span;
using Serilog.Events;
using Serilog.Templates;
using Serilog.Templates.Themes;

namespace FileFormatConverter.WebApi.Extensions;

public static class WebApplicationBuilderExtensions
{
    public static WebApplicationBuilder ApplySerilog(this WebApplicationBuilder builder)
    {
        builder.Logging.ClearProviders();
        builder.Logging.AddSerilog();

        builder.Host.UseSerilog((ctx, services, cfg) =>
        {
            // 1. 全局最小级别 + 动态开关
            cfg.MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .MinimumLevel.Override("System.Net.Http.HttpClient", LogEventLevel.Warning)
                .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Information);

            // 2. 丰富的上下文
            cfg.Enrich.WithProperty("Application", ctx.HostingEnvironment.ApplicationName)
                .Enrich.WithProperty("Environment", ctx.HostingEnvironment.EnvironmentName)
                .Enrich.WithProperty("Version", Assembly.GetExecutingAssembly()
                    .GetName()
                    .Version?
                    .ToString() ?? "1.0.0")
                .Enrich.WithMachineName()
                .Enrich.WithProcessId()
                .Enrich.WithThreadId()
                .Enrich.WithClientIp()
                .Enrich.WithSpan()
                .Enrich.FromLogContext();

            // 3. 控制台输出：彩色 + Emoji + 结构化
            cfg.WriteTo.Console(
                formatter: new ExpressionTemplate(
                    // 行内模板：比传统 outputTemplate 更灵活
                    "[{@t:HH:mm:ss} {@l:u3} {Substring(SourceContext, LastIndexOf(SourceContext, '.') + 1),15}] {@m}\n{@x}",
                    theme: TemplateTheme.Code),
                restrictedToMinimumLevel: LogEventLevel.Information);

            // 4. 文件：每天滚动 JSON，可共享
            cfg.WriteTo.File(
                path: Path.Combine("logs", "log-.txt"),
                rollingInterval: RollingInterval.Day,
                retainedFileCountLimit: 7,
                shared: true);

            cfg.ReadFrom.Configuration(ctx.Configuration)
                .ReadFrom.Services(services);
        });

        return builder;
    }
}