namespace Application.Binance
{
    public record KlineDto
    {
        public double OpenTime { get; set; }

        public decimal OpenPrice { get; set; }
    }
}