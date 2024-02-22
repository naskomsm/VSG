namespace Application.View.Queries
{
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Common.Extensions;
    using Application.Common.Models;
    using Application.View.Interfaces;
    using MediatR;

    public record GetViewsQuery : IRequest<PaginatedList<ViewDto>>
    {
        public int PageNumber { get; init; } = 1;

        public int PageSize { get; init; } = 20;
    }

    public class GetViewsQueryHandler(IViewService viewService) : IRequestHandler<GetViewsQuery, PaginatedList<ViewDto>>
    {
        private readonly IViewService viewService = viewService;

        public async Task<PaginatedList<ViewDto>> Handle(GetViewsQuery request, CancellationToken cancellationToken)
        {
            var views = await this.viewService.FetchAllAsync(cancellationToken);
            var paginatedList = views.AsQueryable().ToPaginatedList(request.PageNumber, request.PageSize);
            return paginatedList;
        }
    }
}