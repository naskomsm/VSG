namespace Application.View.Queries
{
    using System.ComponentModel.DataAnnotations;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Common.Models;
    using Application.View.Interfaces;
    using MediatR;

    public record GetViewsQuery : IRequest<PaginatedList<ViewDto>>
    {
        [Required]
        public int UserId { get; set; }

        public int PageNumber { get; init; } = 1;

        public int PageSize { get; init; } = 20;
    }

    public class GetViewsQueryHandler(IViewService viewService) : IRequestHandler<GetViewsQuery, PaginatedList<ViewDto>>
    {
        private readonly IViewService viewService = viewService;

        public async Task<PaginatedList<ViewDto>> Handle(GetViewsQuery request, CancellationToken cancellationToken)
        {
            return await this.viewService.FetchAllAsync(request, cancellationToken);
        }
    }
}