namespace Application.Binance.Symbol
{
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Binance.Interfaces;
    using Application.Common.Models;
    using MediatR;
    using Application.Common.Extensions;
    using Application.Symbol;

    public record GetSymbolsQuery : IRequest<PaginatedList<SymbolDto>>
    {
        public int PageNumber { get; init; } = 1;

        public int PageSize { get; init; } = 20;
    }

    public class GetSymbolsQueryHandler(IBinanceService binanceService) : IRequestHandler<GetSymbolsQuery, PaginatedList<SymbolDto>>
    {
        private readonly IBinanceService binanceService = binanceService;

        public async Task<PaginatedList<SymbolDto>> Handle(GetSymbolsQuery request, CancellationToken cancellationToken)
        {
            var symbols = await this.binanceService.GetSymbolsAsync(cancellationToken);
            var paginatedList = symbols.AsQueryable().ToPaginatedList(request.PageNumber, request.PageSize);
            return paginatedList;
        }
    }
}