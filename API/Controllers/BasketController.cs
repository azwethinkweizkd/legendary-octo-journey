using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController(StoreContext context) : BaseApiController
    {


        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();
            return BasketDtoMap(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            // get basket || create basket
            var userBasket = await RetrieveBasket(GetBuyerId());
            userBasket ??= CreateBasket();

            // get product
            var product = await context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            // add item
            userBasket.AddItem(product, quantity);

            // save changes
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", BasketDtoMap(userBasket));

            return BadRequest(new ProblemDetails { Title = "Problem saving item to the basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket
            var userBasket = await RetrieveBasket(GetBuyerId());

            // remove item or reduce quantity
            var item = userBasket?.Items.FirstOrDefault(i => i.ProductId == productId);
            if (item == null) return NotFound();

            userBasket?.RemoveItem(productId, quantity);

            // save changes
            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting item from the basket" });
        }

        private async Task<Basket?> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(basket => basket.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };

            context.Baskets.Add(basket);

            return basket;
        }

        private static BasketDto BasketDtoMap(Basket? basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureId = item.Product.PictureId,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList(),
            };
        }
    }


}
