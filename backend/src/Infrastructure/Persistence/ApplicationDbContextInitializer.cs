namespace Infrastructure.Persistence
{
    using System.Threading;
    using Domain.Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;

    public class ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context)
    {
        private readonly ILogger<ApplicationDbContextInitialiser> logger = logger;
        private readonly ApplicationDbContext context = context;

        public async Task InitialiseAsync(CancellationToken cancellationToken = default)
        {
            try
            {
                if (this.context.Database.IsMySql())
                {
                    var migrations = this.context.Database.GetMigrations();
                    await this.context.Database.MigrateAsync(cancellationToken);
                    await this.SeedAsync(cancellationToken);
                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, "An error occurred while initialising the database.");
                throw;
            }
        }

        private async Task SeedAsync(CancellationToken cancellationToken)
        {
            var existingSymbols = this.context.Symbols.Count();
            var existingUsers = this.context.Users.Count();

            if (existingUsers == 0)
            {
                var users = new List<User> {
                    new("User1"),
                    new("User2")
                };

                this.context.Users.AddRange(users);
            }

            if (existingSymbols == 0)
            {
                var symbols = new List<Symbol>
                {
                    new("BTCUSDT"),
                    new("ETCUSDT"),
                    new("XRPUSDT")
                };

                this.context.Symbols.AddRange(symbols);
            }

            await this.context.SaveChangesAsync(cancellationToken);
        }
    }
}