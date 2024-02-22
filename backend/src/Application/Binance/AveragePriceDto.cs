namespace Application.Binance
{
    public record AveragePriceDto
    {
        public int Mins { get; set; }

        public decimal Price { get; set; }

        public double CloseTime { get; set; }
    }
}