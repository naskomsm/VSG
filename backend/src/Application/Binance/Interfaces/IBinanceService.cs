namespace Application.Binance.Interfaces
{
    using Application.Binance.Queries;

    public interface IBinanceService
    {
        Task<List<SymbolDto>> GetSymbolsAsync(CancellationToken cancellationToken);

        Task<List<KlineDto>> GetKlinesAsync(GetKlinesQuery query, CancellationToken cancellationToken);

        Task<AveragePriceDto> GetAveragePriceAsync(GetAveragePriceQuery query, CancellationToken cancellationToken);
    }
}