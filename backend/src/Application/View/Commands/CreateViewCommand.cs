namespace Application.View.Queries
{
    using System.ComponentModel.DataAnnotations;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.View.Interfaces;
    using MediatR;

    public record CreateViewCommand : IRequest<ViewDto>
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int SymbolId { get; set; }

        [Required]
        public string Interval { get; set; } = null!;
    }

    public class CreateViewCommandHandler(IViewService viewService) : IRequestHandler<CreateViewCommand, ViewDto>
    {
        private readonly IViewService viewService = viewService;

        public async Task<ViewDto> Handle(CreateViewCommand request, CancellationToken cancellationToken)
        {
            return await this.viewService.AddViewAsync(request, cancellationToken);
        }
    }
}