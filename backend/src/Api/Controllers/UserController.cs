namespace Api.Controllers
{
    using Api.Controllers.Base;
    using Application.User;
    using Application.User.Commands;
    using Microsoft.AspNetCore.Mvc;

    public class UserController : ApiControllerBase
    {
        [HttpPost("signin")]
        public async Task<ActionResult<UserDto>> Signin([FromBody] SigninCommand command)
        {
            return await this.Mediator.Send(command);
        }
    }
}