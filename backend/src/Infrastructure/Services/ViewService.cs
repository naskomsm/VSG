namespace Infrastructure.Services
{
    using System.Threading;
    using System.Threading.Tasks;
    using Application.Common.Exceptions;
    using Application.Common.Interfaces;
    using Application.Symbol;
    using Application.User.Interfaces;
    using Application.View;
    using Application.View.Interfaces;
    using Application.View.Queries;
    using Domain.Entities;

    public class ViewService(IRepository<View> viewRepository, IUserRepository userRepository, ISymbolRepository symbolRepository) : IViewService
    {
        private readonly IRepository<View> viewRepository = viewRepository;
        private readonly IUserRepository userRepository = userRepository;
        private readonly ISymbolRepository symbolRepository = symbolRepository;

        public async Task<ViewDto> AddViewAsync(CreateViewCommand command, CancellationToken cancellationToken)
        {
            var user = await this.userRepository.GetAsync(command.UserId, cancellationToken) ?? throw new NotFoundException(typeof(User));
            var symbol = await this.symbolRepository.GetAsync(command.SymbolId, cancellationToken) ?? throw new NotFoundException(typeof(Symbol));

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

        public async Task<List<ViewDto>> FetchAllAsync(CancellationToken cancellationToken = default)
        {
            var views = await this.viewRepository.FetchAllAsync(cancellationToken);

            return views.Select(x => new ViewDto
            {
                Id = x.Id,
                Symbol = x.Symbol!.Name,
                Interval = x.Interval
            }).ToList();
        }
    }
}