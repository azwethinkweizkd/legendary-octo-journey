using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        private static readonly string[] roles = ["Member", "Admin"];

        public static async Task InitializeAsync(StoreContext context, UserManager<User> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "p@$$W0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "p@$$W0rd");
                await userManager.AddToRolesAsync(admin, roles);
            }

            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new() {
                    Name = "Angular Speedster Board 2000",
                    Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    PictureId = "/images/products/sb-ang1.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QntyInStock = 100
                },
                new() {
                    Name = "Green Angular Board 3000",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 15000,
                    PictureId = "/images/products/sb-ang2.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QntyInStock = 100
                },
                new() {
                    Name = "Core Board Speed Rush 3",
                    Description = "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureId = "/images/products/sb-core1.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QntyInStock = 100
                },
                new() {
                    Name = "Net Core Super Board",
                    Description = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    PictureId = "/images/products/sb-core2.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QntyInStock = 100
                },
                new() {
                    Name = "React Board Super Whizzy Fast",
                    Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    PictureId = "/images/products/sb-react1.png",
                    Brand = "React",
                    Type = "Boards",
                    QntyInStock = 100
                },
                new() {
                    Name = "Typescript Entry Board",
                    Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12000,
                    PictureId = "/images/products/sb-ts1.png",
                    Brand = "TypeScript",
                    Type = "Boards",
                    QntyInStock = 100
                },
                new() {
                    Name = "Core Blue Hat",
                    Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureId = "/images/products/hat-core1.png",
                    Brand = "NetCore",
                    Type = "Hats",
                    QntyInStock = 100
                },
                new() {
                    Name = "Green React Woolen Hat",
                    Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    PictureId = "/images/products/hat-react1.png",
                    Brand = "React",
                    Type = "Hats",
                    QntyInStock = 100
                },
                new() {
                    Name = "Purple React Woolen Hat",
                    Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureId = "/images/products/hat-react2.png",
                    Brand = "React",
                    Type = "Hats",
                    QntyInStock = 100
                },
                new() {
                    Name = "Blue Code Gloves",
                    Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    PictureId = "/images/products/glove-code1.png",
                    Brand = "VS Code",
                    Type = "Gloves",
                    QntyInStock = 100
                },
                new() {
                    Name = "Green Code Gloves",
                    Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureId = "/images/products/glove-code2.png",
                    Brand = "VS Code",
                    Type = "Gloves",
                    QntyInStock = 100
                },
                new() {
                    Name = "Purple React Gloves",
                    Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    PictureId = "/images/products/glove-react1.png",
                    Brand = "React",
                    Type = "Gloves",
                    QntyInStock = 100
                },
                new() {
                    Name = "Green React Gloves",
                    Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    PictureId = "/images/products/glove-react2.png",
                    Brand = "React",
                    Type = "Gloves",
                    QntyInStock = 100
                },
                new() {
                    Name = "Redis Red Boots",
                    Description = "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    PictureId = "/images/products/boot-redis1.png",
                    Brand = "Redis",
                    Type = "Boots",
                    QntyInStock = 100
                },
                new() {
                    Name = "Core Red Boots",
                    Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    PictureId = "/images/products/boot-core2.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QntyInStock = 100
                },
                new() {
                    Name = "Core Purple Boots",
                    Description = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 19999,
                    PictureId = "/images/products/boot-core1.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QntyInStock = 100
                },
                new() {
                    Name = "Angular Purple Boots",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 15000,
                    PictureId = "/images/products/boot-ang2.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QntyInStock = 100
                },
                new() {
                    Name = "Angular Blue Boots",
                    Description = "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureId = "/images/products/boot-ang1.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QntyInStock = 100
                },
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}