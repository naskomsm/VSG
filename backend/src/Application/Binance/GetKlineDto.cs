namespace Application.Binance
{
    public record GetKlineDto
    {
        public double OpenTime { get; set; }

        public decimal OpenPrice { get; set; }
    }
}