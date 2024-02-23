namespace Application.View.Interfaces
{
    using Application.Common.Models;
    using Application.View.Command;
    using Application.View.Queries;

    public interface IViewService
    {
        Task<PaginatedList<ViewDto>> FetchAllAsync(GetViewsQuery query, CancellationToken cancellationToken = default);

        Task<ViewDto> AddViewAsync(CreateViewCommand command, CancellationToken cancellationToken);

        Task<MessageDto> DeleteAsync(DeleteViewCommand command, CancellationToken cancellationToken);
    }
}