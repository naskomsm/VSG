namespace Api.Controllers
{
    using Api.Controllers.Base;
    using Application.Binance;
    using Application.Binance.Queries;
    using Application.Binance.Symbol;
    using Application.Common.Models;
    using Application.Symbol;
    using Application.View;
    using Application.View.Queries;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(Policy = "Access")]
    public class BinanceController : ApiControllerBase
    {
        [HttpGet("klines")]
        public async Task<ActionResult<List<KlineDto>>> GetKlines([FromQuery] GetKlinesQuery query)
        {
            return await this.Mediator.Send(query);
        }

        [HttpGet("average-price")]
        public async Task<ActionResult<AveragePriceDto>> GetAveragePrice([FromQuery] GetAveragePriceQuery query)
        {
            return await this.Mediator.Send(query);
        }

        [HttpGet("symbols")]
        public async Task<ActionResult<PaginatedList<SymbolDto>>> GetSymbols([FromQuery] GetSymbolsQuery query)
        {
            return await this.Mediator.Send(query);
        }
    }
}