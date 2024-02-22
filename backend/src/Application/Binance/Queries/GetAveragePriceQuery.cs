namespace Application.Binance.Queries
{
    using System.ComponentModel.DataAnnotations;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Binance.Interfaces;
    using MediatR;

    public record GetAveragePriceQuery : IRequest<AveragePriceDto>
    {
        [Required]
        public string Symbol { get; set; } = null!;
    }

    public class GetAveragePriceQueryHandler(IBinanceService binanceService) : IRequestHandler<GetAveragePriceQuery, AveragePriceDto>
    {
        private readonly IBinanceService binanceService = binanceService;

        public async Task<AveragePriceDto> Handle(GetAveragePriceQuery request, CancellationToken cancellationToken)
        {
            return await this.binanceService.GetAveragePriceAsync(request, cancellationToken);
        }
    }
}