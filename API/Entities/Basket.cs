namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = [];

        public void AddItem(Product product, int quantity)
        {
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem == null) 
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }
            else 
            {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            var existingItem = Items.FirstOrDefault(i => i.ProductId == productId);
            if (existingItem == null) return;

            existingItem.Quantity -= quantity;
            if (existingItem.Quantity <= 0) Items.Remove(existingItem);
        }

        public decimal BasketSubTotal()
        {
            return Items.Sum(item => item.Product.Price *  item.Quantity);
        }

        public decimal DeliveryFee()
        {
            decimal subtotal = BasketSubTotal();
            return subtotal >= 10000 ? 0 : 500;
        }

        public decimal CalculateTax(decimal taxRate)
        {
            return (BasketSubTotal() * taxRate);
        }

        public decimal BasketTotal(decimal taxRate)
        {
            return BasketSubTotal() + CalculateTax(taxRate) + DeliveryFee();
        }
    }
}
