using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController(StoreContext context) : ControllerBase
    {
        private readonly StoreContext context = context;

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProductsAsync()
        {
            return await context.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductAsync(int id)
        {
            return await context.Products.FindAsync(id);
        }
    }
}
