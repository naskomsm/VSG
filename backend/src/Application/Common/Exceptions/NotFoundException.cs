namespace Application.Common.Exceptions
{
    public class NotFoundException(Type entityType) : Exception()
    {
        public Type EntityType { get; set; } = entityType;
    }
}