namespace Application.Symbol
{
    public record SymbolDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
    }
}