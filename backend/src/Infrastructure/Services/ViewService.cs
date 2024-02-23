namespace Infrastructure.Services
{
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Common.Exceptions;
    using Application.Common.Extensions;
    using Application.Common.Models;
    using Application.Symbol;
    using Application.User.Interfaces;
    using Application.View;
    using Application.View.Command;
    using Application.View.Interfaces;
    using Application.View.Queries;
    using Domain.Entities;

    public class ViewService(IViewRepository viewRepository, IUserRepository userRepository, ISymbolRepository symbolRepository) : IViewService
    {
        private readonly IViewRepository viewRepository = viewRepository;
        private readonly IUserRepository userRepository = userRepository;
        private readonly ISymbolRepository symbolRepository = symbolRepository;

        public async Task<ViewDto> AddViewAsync(CreateViewCommand command, CancellationToken cancellationToken)
        {
            var user = await this.userRepository.GetAsync(command.UserId, cancellationToken) ?? throw new NotFoundException(typeof(User));
            var symbol = await this.symbolRepository.GetSymbolAsync(command.Symbol, cancellationToken) ?? throw new NotFoundException(typeof(Symbol));

            var view = new View
            {
                UserId = user.Id,
                SymbolId = symbol.Id,
                Interval = command.Interval
            };

            await this.viewRepository.AddAsync(view, cancellationToken);
            await this.viewRepository.SaveChangesAsync(cancellationToken);

            return new ViewDto
            {
                Id = view.Id,
                Symbol = symbol.Name,
                Interval = view.Interval
            };
        }

        public async Task<MessageDto> DeleteAsync(DeleteViewCommand command, CancellationToken cancellationToken)
        {
            var entity = await this.viewRepository.GetAsync(command.Id, cancellationToken) ?? throw new NotFoundException(typeof(View));
            this.viewRepository.Delete(entity);
            await this.viewRepository.SaveChangesAsync(cancellationToken);

            return new MessageDto { Message = "Deleted view" };
        }

        public async Task<PaginatedList<ViewDto>> FetchAllAsync(GetViewsQuery query, CancellationToken cancellationToken = default)
        {
            var views = await this.viewRepository
                .GetViewsByUserId(query.UserId)
                .Select(x => new ViewDto
                {
                    Id = x.Id,
                    Symbol = x.Symbol!.Name,
                    Interval = x.Interval
                })
                .PaginatedListAsync(query.PageNumber, query.PageSize);

            return views;
        }
    }
}