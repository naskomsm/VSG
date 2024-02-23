namespace Application.View.Interfaces
{
    using Domain.Entities;
    using Application.Common.Interfaces;

    public interface IViewRepository : IRepository<View>
    {
        IQueryable<View> GetViewsByUserId(int userId);
    }
}