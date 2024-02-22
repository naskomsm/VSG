namespace Application.User.Commands
{
    using System.ComponentModel.DataAnnotations;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.User.Interfaces;
    using MediatR;

    public record SigninCommand : IRequest<UserDto>
    {
        [Required]
        public string Username { get; set; } = null!;
    }

    public class SigninCommandHandler(IUserService userService) : IRequestHandler<SigninCommand, UserDto>
    {
        private readonly IUserService userService = userService;

        public async Task<UserDto> Handle(SigninCommand request, CancellationToken cancellationToken)
        {
            return await this.userService.AddUserAsync(request.Username, cancellationToken);
        }
    }
}