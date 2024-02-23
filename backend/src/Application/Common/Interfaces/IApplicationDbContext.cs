namespace Application.Common.Inferfaces
{
    using Domain.Entities;
    using Microsoft.EntityFrameworkCore;

    public interface IApplicationDbContext
    {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);

        public DbSet<View> Views { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Symbol> Symbols { get; set; }
    }
}
