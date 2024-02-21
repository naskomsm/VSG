namespace Domain.Entities
{
    using System.ComponentModel.DataAnnotations;
    using Domain.Entities.Base;

    public class User : BaseAuditableEntity
    {
        private string name = null!;

        public string Name
        {
            get => this.name;
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    throw new ValidationException("Name cannot be null or empty.");
                }

                this.name = value;
            }
        }
    }
}