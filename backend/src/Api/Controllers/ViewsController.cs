namespace Api.Controllers
{
    using Api.Controllers.Base;
    using Application.Common.Models;
    using Application.View.Queries;
    using Application.View;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(Policy = "Access")]
    public class ViewsController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<ViewDto>> CreateView([FromBody] CreateViewCommand command)
        {
            return await this.Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedList<ViewDto>>> GetViews([FromQuery] GetViewsQuery query)
        {
            return await this.Mediator.Send(query);
        }
    }
}