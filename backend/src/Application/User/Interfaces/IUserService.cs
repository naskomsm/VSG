namespace Application.User.Interfaces
{
    public interface IUserService
    {
        Task<bool> UserExistsByUsername(string username, CancellationToken cancellationToken = default);

        Task<UserDto> AddUserAsync(string username, CancellationToken cancellationToken);
    }
}