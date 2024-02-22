namespace Application.View
{
    public record ViewDto
    {
        public int Id { get; set; }

        public string Symbol { get; set; } = null!;

        public string Interval { get; set; } = null!;
    }
}