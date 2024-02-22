namespace Application.Binance.Interfaces
{
    using Application.Binance.Queries;

    public interface IBinanceService
    {
        Task<List<GetKlineDto>> GetKlinesAsync(GetKlinesQuery query, CancellationToken cancellationToken);
    }
}