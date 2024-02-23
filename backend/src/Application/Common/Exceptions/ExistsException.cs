namespace Application.Common.Exceptions
{
    public class ExistsException(Type entityType) : Exception()
    {
        public Type EntityType { get; set; } = entityType;
    }
}