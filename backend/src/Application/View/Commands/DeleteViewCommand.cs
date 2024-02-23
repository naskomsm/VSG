namespace Application.View.Command
{
    using System.ComponentModel.DataAnnotations;
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Common.Models;
    using Application.View.Interfaces;
    using MediatR;

    public record DeleteViewCommand : IRequest<MessageDto>
    {
        [Required]
        public int Id { get; set; }
    }

    public class DeleteViewCommandHandler(IViewService viewService) : IRequestHandler<DeleteViewCommand, MessageDto>
    {
        private readonly IViewService viewService = viewService;

        public async Task<MessageDto> Handle(DeleteViewCommand request, CancellationToken cancellationToken)
        {
            return await this.viewService.DeleteAsync(request, cancellationToken);
        }
    }
}