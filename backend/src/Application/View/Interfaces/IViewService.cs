namespace Application.View.Interfaces
{
    using Application.View.Queries;

    public interface IViewService
    {
        Task<List<ViewDto>> FetchAllAsync(CancellationToken cancellationToken = default);

        Task<ViewDto> AddViewAsync(CreateViewCommand command, CancellationToken cancellationToken);
    }
}