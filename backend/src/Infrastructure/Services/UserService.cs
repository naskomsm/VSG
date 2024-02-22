namespace Infrastructure.Services
{
    using System.Threading;
    using System.Threading.Tasks;
    using Application.User;
    using Application.User.Interfaces;
    using Domain.Entities;

    public class UserService(IUserRepository repository) : IUserService
    {
        private readonly IUserRepository repository = repository;

        public async Task<UserDto> AddUserAsync(string username, CancellationToken cancellationToken)
        {
            var existingUser = await this.repository.GetUserByUsernameAsync(username, cancellationToken);

            if (existingUser != null)
            {
                return new UserDto
                {
                    Id = existingUser.Id,
                    Name = existingUser.Name
                };
            }

            var user = new User(username);

            await this.repository.AddAsync(user, cancellationToken);
            await this.repository.SaveChangesAsync(cancellationToken);

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name
            };
        }

        public async Task<bool> UserExistsByUsername(string username, CancellationToken cancellationToken)
        {
            return await this.repository.UserExistsByUsername(username, cancellationToken);
        }
    }
}