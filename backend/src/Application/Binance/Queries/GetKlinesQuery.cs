namespace Application.Binance.Queries
{
    using System.ComponentModel.DataAnnotations;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Binance.Interfaces;
    using MediatR;

    public record GetKlinesQuery : IRequest<List<GetKlineDto>>
    {
        [Required]
        public string Symbol { get; set; } = null!;

        [Required]
        public string Interval { get; set; } = null!;

        public int Limit { get; set; } = 20;
    }

    public class GetKlinesQueryHandler(IBinanceService binanceService) : IRequestHandler<GetKlinesQuery, List<GetKlineDto>>
    {
        private readonly IBinanceService binanceService = binanceService;

        public async Task<List<GetKlineDto>> Handle(GetKlinesQuery request, CancellationToken cancellationToken)
        {
            return await this.binanceService.GetKlinesAsync(request, cancellationToken);
        }
    }
}