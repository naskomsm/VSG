namespace Infrastructure.Services
{
    using System.Threading;
    using System.Threading.Tasks;
    using Application.User.Interfaces;

    public class UserService(IUserRepository repository) : IUserService
    {
        private readonly IUserRepository repository = repository;

        public async Task<bool> UserExistsByUsername(string username, CancellationToken cancellationToken)
        {
            return await this.repository.UserExistsByUsername(username, cancellationToken);
        }
    }
}