namespace Infrastructure.Repositories
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Common.Inferfaces;
    using Application.Common.Interfaces;
    using Domain.Entities;
    using Microsoft.EntityFrameworkCore;

    public class ViewRepository(IApplicationDbContext context) : IRepository<View>
    {
        private readonly IApplicationDbContext context = context;

        public async Task AddAsync(View entity, CancellationToken cancellationToken = default)
        {
            await this.context.Views.AddAsync(entity, cancellationToken);
        }

        public void BatchDelete(IList<View> entities)
        {
            throw new NotImplementedException();
        }

        public void Delete(View entity)
        {
            this.context.Views.Remove(entity);
        }

        public Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<IList<View>> FetchAllAsync(CancellationToken cancellationToken = default)
        {
            return await this.context.Views
                .Include(x => x.Symbol)
                .ToListAsync(cancellationToken);
        }

        public Task<View?> GetAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await this.context.SaveChangesAsync(cancellationToken);
        }

        public void Update(View entity)
        {
            throw new NotImplementedException();
        }
    }
}
