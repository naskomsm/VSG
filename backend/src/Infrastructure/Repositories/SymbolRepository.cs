namespace Infrastructure.Repositories
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Common.Inferfaces;
    using Application.Common.Interfaces;
    using Domain.Entities;
    using Microsoft.EntityFrameworkCore;

    public class SymbolRepository(IApplicationDbContext context) : IRepository<Symbol>
    {
        private readonly IApplicationDbContext context = context;

        public Task AddAsync(Symbol entity, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public void BatchDelete(IList<Symbol> entities)
        {
            throw new NotImplementedException();
        }

        public void Delete(Symbol entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<IList<Symbol>> FetchAllAsync(CancellationToken cancellationToken = default)
        {
            return await this.context.Symbols.ToListAsync(cancellationToken);
        }

        public Task<Symbol?> GetAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public void Update(Symbol entity)
        {
            throw new NotImplementedException();
        }
    }
}