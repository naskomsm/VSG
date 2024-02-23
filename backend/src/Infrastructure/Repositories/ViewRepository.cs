namespace Infrastructure.Repositories
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Common.Inferfaces;
    using Application.View.Interfaces;
    using Domain.Entities;
    using Microsoft.EntityFrameworkCore;

    public class ViewRepository(IApplicationDbContext context) : IViewRepository
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

        public IQueryable<View> FetchAll(CancellationToken cancellationToken = default)
        {
            return this.context.Views
                .Include(x => x.Symbol);
        }

        public async Task<View?> GetAsync(int id, CancellationToken cancellationToken = default)
        {
            return await this.context.Views.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public IQueryable<View> GetViewsByUserId(int userId)
        {
            return this.context.Views.Where(x => x.UserId == userId);
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
