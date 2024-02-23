namespace Application.Binance.Interfaces
{
    using Application.Binance.Queries;
    using Application.Binance.Symbol;
    using Application.Common.Models;
    using Application.Symbol;

    public interface IBinanceService
    {
        Task<PaginatedList<SymbolDto>> GetSymbolsAsync(GetSymbolsQuery query, CancellationToken cancellationToken);

        Task<List<KlineDto>> GetKlinesAsync(GetKlinesQuery query, CancellationToken cancellationToken);

        Task<AveragePriceDto> GetAveragePriceAsync(GetAveragePriceQuery query, CancellationToken cancellationToken);
    }
}