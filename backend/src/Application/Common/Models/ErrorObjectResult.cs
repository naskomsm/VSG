namespace Application.Common.Models
{
    public record ErrorObjectResult
    {
        public ErrorObjectResult(string type, string title, int status)
        {
            this.Type = type;
            this.Title = title;
            this.TraceId = Guid.NewGuid();
            this.Status = status;
        }

        public string Type { get; private set; }

        public string Title { get; private set; }

        public int Status { get; private set; }

        public Guid TraceId { get; set; }

        public IDictionary<string, IList<string>>? Errors { get; set; }
    }
}