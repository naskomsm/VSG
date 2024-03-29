namespace Infrastructure.Services
{
    using System.Net.Http.Json;
    using System.Text.Json;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Binance;
    using Application.Binance.Interfaces;
    using Application.Binance.Queries;
    using Application.Binance.Symbol;
    using Application.Common.Exceptions;
    using Application.Common.Extensions;
    using Application.Common.Models;
    using Application.Symbol;
    using Domain.Entities;
    using Microsoft.Extensions.Configuration;

    public class BinanceService(IHttpClientFactory httpClientFactory, IConfiguration configuration, ISymbolRepository symbolRepository) : IBinanceService
    {
        private readonly IHttpClientFactory httpClientFactory = httpClientFactory;
        private readonly IConfiguration configuration = configuration;
        private readonly ISymbolRepository symbolRepository = symbolRepository;

        public async Task<AveragePriceDto> GetAveragePriceAsync(GetAveragePriceQuery query, CancellationToken cancellationToken)
        {
            var symbol = await this.symbolRepository.GetSymbolAsync(query.Symbol, cancellationToken) ?? throw new NotFoundException(typeof(Symbol));

            string? httpClientName = configuration["BinanceHttpClientName"];
            using HttpClient client = httpClientFactory.CreateClient(httpClientName ?? "");

            AveragePriceDto? averagePrice = await client.GetFromJsonAsync<AveragePriceDto>($"/api/v3/avgPrice?symbol={symbol.Name}", new JsonSerializerOptions(JsonSerializerDefaults.Web), cancellationToken: cancellationToken);

            return averagePrice ?? new AveragePriceDto();
        }

        public async Task<List<KlineDto>> GetKlinesAsync(GetKlinesQuery query, CancellationToken cancellationToken)
        {
            var symbol = await this.symbolRepository.GetSymbolAsync(query.Symbol, cancellationToken) ?? throw new NotFoundException(typeof(Symbol));

            string? httpClientName = configuration["BinanceHttpClientName"];
            using HttpClient client = httpClientFactory.CreateClient(httpClientName ?? "");

            List<dynamic>? jsonArray = await client.GetFromJsonAsync<List<dynamic>>($"/api/v3/klines?symbol={symbol.Name}&interval={query.Interval}&limit={query.Limit}", new JsonSerializerOptions(JsonSerializerDefaults.Web), cancellationToken: cancellationToken);

            var klines = new List<KlineDto>();

            foreach (var item in jsonArray!)
            {
                if (!double.TryParse(item[0].ToString(), out double openTime))
                {
                    continue; // Skip this item if parsing fails
                }

                // Attempt to parse remaining decimals using decimal.TryParse
                if (!decimal.TryParse(item[1].ToString(), out decimal openPrice))
                {
                    continue; // Skip this item if any parsing fails
                }

                // Add parsed data to the GetKlineDto object
                klines.Add(new KlineDto
                {
                    OpenTime = openTime,
                    OpenPrice = openPrice
                });
            }

            return klines;
        }

        public async Task<PaginatedList<SymbolDto>> GetSymbolsAsync(GetSymbolsQuery query, CancellationToken cancellationToken)
        {
            var symbols = await this.symbolRepository
                .FetchAll(cancellationToken)
                .Select(x => new SymbolDto
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .PaginatedListAsync(query.PageNumber, query.PageSize);

            return symbols;
        }
    }
}