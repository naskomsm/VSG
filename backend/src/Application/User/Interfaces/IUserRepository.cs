namespace Application.User.Interfaces
{
    using Domain.Entities;
    using Application.Common.Interfaces;

    public interface IUserRepository : IRepository<User>
    {
        Task<bool> UserExistsByUsername(string username, CancellationToken cancellationToken);

        Task<User?> GetUserByUsernameAsync(string username, CancellationToken cancellationToken);
    }
}