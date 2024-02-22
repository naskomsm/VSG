namespace Infrastructure.Repositories
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Common.Inferfaces;
    using Application.Common.Interfaces;
    using Application.User;
    using Application.User.Interfaces;
    using Domain.Entities;
    using Microsoft.EntityFrameworkCore;

    public class UserRepository(IApplicationDbContext context) : IUserRepository
    {
        private readonly IApplicationDbContext context = context;

        public async Task AddAsync(User entity, CancellationToken cancellationToken = default)
        {
            await this.context.Users.AddAsync(entity, cancellationToken);
        }

        public void BatchDelete(IList<User> entities)
        {
            throw new NotImplementedException();
        }

        public void Delete(User entity)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default)
        {
            return await this.context
                .Users
                .AnyAsync(x => x.Id == id, cancellationToken);
        }

        public async Task<IList<User>> FetchAllAsync(CancellationToken cancellationToken = default)
        {
            return await this.context
                .Users
                .ToListAsync(cancellationToken);
        }

        public async Task<User?> GetAsync(int id, CancellationToken cancellationToken = default)
        {
            return await this.context.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public async Task<User?> GetUserByUsernameAsync(string username, CancellationToken cancellationToken)
        {
            return await this.context.Users.FirstOrDefaultAsync(x => x.Name == username, cancellationToken);
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await this.context.SaveChangesAsync(cancellationToken);
        }

        public void Update(User entity)
        {
            this.context.Users.Update(entity);
        }

        public async Task<bool> UserExistsByUsername(string username, CancellationToken cancellationToken)
        {
            return await this.context
                .Users
                .AnyAsync(x => x.Name == username, cancellationToken);
        }
    }
}