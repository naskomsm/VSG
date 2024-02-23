namespace Domain.Entities.Base
{
    public abstract class BaseAuditableEntity : BaseEntity
    {
        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime? LastModified { get; set; } = DateTime.Now;
    }
}