namespace Application.User.Interfaces
{
    public interface IUserService
    {
        Task<bool> UserExistsByUsername(string username, CancellationToken cancellationToken = default);
    }
}