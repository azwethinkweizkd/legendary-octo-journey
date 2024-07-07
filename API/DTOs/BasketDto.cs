namespace API.DTOs
{
    public class BasketDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
        public int DeliveryFee { get; set; }
        public int Subtotal { get; set; }
        public int Tax { get; set; }
        public int Total { get; set; }
    }
}
