namespace Api.Filters
{
    using Application.User.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using System.Text.Json;
    public partial class Access : IAuthorizationRequirement { }

    public class AccessAuthorizationHandler(IHttpContextAccessor httpContextAccessor, IUserService userService) : AuthorizationHandler<Access>
    {
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IUserService userService = userService;

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, Access requirement)
        {
            var httpContext = this._httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                context.Fail();
            }

            var username = httpContext!.Request.Headers["user"].SingleOrDefault();

            if (username == null)
            {
                await GenerateResponse(httpContext);
                context.Fail();
            }

            var exists = await this.userService.UserExistsByUsername(username!);
            if (!exists)
            {
                await GenerateResponse(httpContext);
            }

            context.Succeed(requirement);
        }

        private static async Task GenerateResponse(HttpContext httpContext)
        {
            var details = new ErrorDetails("Unauthorized");
            var message = JsonSerializer.Serialize(details);

            httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            httpContext.Response.ContentType = "application/json";
            await httpContext.Response.WriteAsync(message);
            await httpContext.Response.CompleteAsync();
        }
    }
}