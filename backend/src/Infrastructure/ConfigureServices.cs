namespace Infrastrucure
{
    using Application.Binance.Interfaces;
    using Application.Common.Inferfaces;
    using Application.Common.Interfaces;
    using Application.Symbol;
    using Application.User.Interfaces;
    using Application.View.Interfaces;
    using Domain.Entities;
    using Infrastructure.Interceptors;
    using Infrastructure.Persistence;
    using Infrastructure.Repositories;
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
            services.AddTransient<ISymbolRepository, SymbolRepository>();

            services.AddTransient<IRepository<View>, ViewRepository>();
            services.AddTransient<IUserRepository, UserRepository>();

            // Register services below..
            services.AddTransient<IBinanceService, BinanceService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IViewService, ViewService>();

            return services;
        }
    }
}