using System.Reflection;
using System.Runtime.InteropServices;
using Serilog;

namespace FileFormatConverter.WebApi.Infrastructure;

public static class AppStartup
{
    public static void LogStartupInfo(this WebApplicationBuilder builder)
    {
        var asm = Assembly.GetExecutingAssembly();
        var hostEnv = builder.Environment;

        var buildTime = File.GetLastWriteTimeUtc(asm.Location);
        var urls = builder.Configuration[WebHostDefaults.ServerUrlsKey] ?? "http://localhost:5000";
        urls += "/scalar/v1";
        using var logger = new LoggerConfiguration()
            .WriteTo.Console(outputTemplate: "{Message:lj}{NewLine}")
            .CreateLogger();

        logger.Information("------------------ Startup Info ------------------");
        logger.Information("Application : {Application}", hostEnv.ApplicationName);
        logger.Information("Version     : {Version}", asm.GetName().Version?.ToString(3) ?? "1.0.0");
        logger.Information("Build       : {Build}", buildTime.ToString("yyyy-MM-dd HH:mm:ss UTC"));
        logger.Information("Environment : {Environment}", hostEnv.EnvironmentName);
        logger.Information("Runtime     : {Runtime}", RuntimeInformation.FrameworkDescription);
        logger.Information("OS          : {OS}", RuntimeInformation.OSDescription);
        logger.Information("OSArch      : {OSArch}", RuntimeInformation.OSArchitecture);
        logger.Information("ProcessId   : {ProcessId}", Environment.ProcessId);
        logger.Information("WorkingDir  : {WorkingDir}", Environment.CurrentDirectory);
        logger.Information("CommandLine : {CommandLine}", Environment.CommandLine);
        logger.Information("ServerUrls  : {ServerUrls}", urls);
        logger.Information("--------------------------------------------------");
    }
}