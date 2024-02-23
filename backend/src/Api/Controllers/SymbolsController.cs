namespace Api.Controllers
{
    using Api.Controllers.Base;
    using Application.Binance.Symbol;
    using Application.Common.Models;
    using Application.Symbol;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(Policy = "Access")]
    public class SymbolsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<SymbolDto>>> GetSymbols([FromQuery] GetSymbolsQuery query)
        {
            return await this.Mediator.Send(query);
        }
    }
}