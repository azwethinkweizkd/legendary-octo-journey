using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController(StoreContext context) : BaseApiController
    {


        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            Basket? basket = await RetrieveBaskets();

            if (basket == null) return NotFound();

            return Ok(basket);
        }

        [HttpPost]

        public async Task<ActionResult> AddItemToBasket(int productId, int quatity)
        {
            // get basket || create basket
            var userBasket = await RetrieveBaskets();
            userBasket ??= CreateBasket();

            // get product
            var product = await context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            // add item
            userBasket.AddItem(product, quatity);

            // save changes
            var result = await context.SaveChangesAsync() > 0;

            if (result)  return StatusCode(201);

            return BadRequest(new ProblemDetails { Title = "Problem saving item to the basket" });
        }


        [HttpDelete]
        public async Task<ActionResult> RemoveBasketIem(int productId, int quatity)
        {
            // get basket
            // remove item or reduce quantity
            // save changes

            return Ok();
        }

        private async Task<Basket?> RetrieveBaskets()
        {
            return await context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
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

    }


}
