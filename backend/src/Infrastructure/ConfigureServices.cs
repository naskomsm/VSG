namespace Infrastrucure
{
    using Application.Binance.Interfaces;
    using Application.Common.Inferfaces;
    using Infrastructure.Interceptors;
    using Infrastructure.Persistence;
    using Infrastructure.Services;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddScoped<AuditableEntityInterceptor>();

            services.AddDbContext<ApplicationDbContext>(
                (options) => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString), b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName))
            );

            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            services.AddScoped<ApplicationDbContextInitialiser>();

            var httpClientName = configuration["BinanceHttpClientName"];
            var httpClientUrl = configuration["BinanceUrl"];
            ArgumentException.ThrowIfNullOrEmpty(httpClientName);
            ArgumentException.ThrowIfNullOrEmpty(httpClientUrl);

            services.AddHttpClient(
                httpClientName,
                client =>
                {
                    client.BaseAddress = new Uri(httpClientUrl);
                });

            // Register repositories below..

            // Register services below..
            services.AddTransient<IBinanceService, BinanceService>();

            return services;
        }
    }
}