namespace Infrastrucure.Persistence
{
    using MediatR;
    using Application.Common.Inferfaces;
    using Microsoft.EntityFrameworkCore;
    using Infrastructure.Interceptors;
    using Domain.Entities;
    using System.Reflection;
    using Infrastructure.Common;

    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {

        private readonly IMediator? mediator;
        private readonly AuditableEntitySaveChangesInterceptor? auditableEntitySaveChangesInterceptor;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            IMediator mediator,
            AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor)
            : base(options)
        {
            this.mediator = mediator;
            this.auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
        }

        public DbSet<View> Views { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Symbol> Symbols { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (this.auditableEntitySaveChangesInterceptor != null)
            {
                optionsBuilder.AddInterceptors(this.auditableEntitySaveChangesInterceptor);
            }
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            if (this.mediator != null)
            {
                await this.mediator.DispatchDomainEvents(this);
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}