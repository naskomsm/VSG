namespace Infrastructure.Repositories
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Common.Inferfaces;
    using Application.Symbol;
    using Domain.Entities;
    using Microsoft.EntityFrameworkCore;

    public class SymbolRepository(IApplicationDbContext context) : ISymbolRepository
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

        public IQueryable<Symbol> FetchAll(CancellationToken cancellationToken = default)
        {
            return this.context.Symbols.AsQueryable();
        }

        public async Task<Symbol?> GetAsync(int id, CancellationToken cancellationToken = default)
        {
            return await this.context.Symbols.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public async Task<Symbol?> GetSymbolAsync(string symbol, CancellationToken cancellationToken)
        {
            return await this.context.Symbols.FirstOrDefaultAsync(x => x.Name == symbol, cancellationToken);
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await this.context.SaveChangesAsync(cancellationToken);
        }

        public void Update(Symbol entity)
        {
            throw new NotImplementedException();
        }
    }
}