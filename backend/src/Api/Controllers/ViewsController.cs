namespace Api.Controllers
{
    using Api.Controllers.Base;
    using Application.Common.Models;
    using Application.View.Queries;
    using Application.View;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Application.View.Command;

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

        [HttpDelete("{Id}")]
        public async Task<ActionResult<MessageDto>> Delete([FromRoute] DeleteViewCommand command)
        {
            return await this.Mediator.Send(command);
        }
    }
}