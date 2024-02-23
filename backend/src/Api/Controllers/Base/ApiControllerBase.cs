namespace Api.Controllers.Base
{
    using MediatR;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : ControllerBase
    {
        private ISender mediator = null!;

        public ISender Mediator
        {
            protected get => this.mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
            set
            {
                if (value != null)
                {
                    this.mediator = value;
                }
            }
        }
    }
}