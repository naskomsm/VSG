namespace Domain.Entities
{
    using System.ComponentModel.DataAnnotations;
    using Domain.Entities.Base;

    public class View : BaseAuditableEntity
    {
        private string interval = null!;

        public int UserId { get; set; }

        public virtual User? User { get; set; }

        public int SymbolId { get; set; }

        public virtual Symbol? Symbol { get; set; }

        public string Interval
        {
            get => this.interval;
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    throw new ValidationException("Interval cannot be null or empty.");
                }

                this.interval = value;
            }
        }
    }
}