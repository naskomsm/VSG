namespace Application.Symbol
{
    using Application.Common.Interfaces;
    using Domain.Entities;

    public interface ISymbolRepository : IRepository<Symbol>
    {
        Task<Symbol?> GetSymbolAsync(string symbol, CancellationToken cancellationToken);
    }
}