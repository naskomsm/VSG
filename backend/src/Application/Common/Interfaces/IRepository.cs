namespace Application.Common.Interfaces
{
    using Domain.Entities.Base;

    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        IQueryable<TEntity> FetchAll(CancellationToken cancellationToken = default);

        Task AddAsync(TEntity entity, CancellationToken cancellationToken = default);

        void Update(TEntity entity);

        Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default);

        void Delete(TEntity entity);

        void BatchDelete(IList<TEntity> entities);

        Task<TEntity?> GetAsync(int id, CancellationToken cancellationToken = default);

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}