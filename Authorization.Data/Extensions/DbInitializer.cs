using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Authorization.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Authorization.Data.Extensions
{
    public static class DbInitializer
    {
        public static async Task Initialize(this AppDbContext db)
        {
            Console.WriteLine("Initializing database");
            await db.Database.MigrateAsync();
            Console.WriteLine("Database initialized");

            if (! await db.Roles.AnyAsync())
            {
                Console.WriteLine("Seeding roles...");

                var roles = new List<Role>
                {
                    new Role { Name = "Tech", Description = "A technical role" },
                    new Role { Name = "User", Description = "A user role" },
                    new Role { Name = "Executive", Description = "An executive role" }
                };

                await db.Roles.AddRangeAsync(roles);
                await db.SaveChangesAsync();
            }

            List<TableCategory> categories;

            if (! await db.TableCategories.AnyAsync())
            {
                Console.WriteLine("Seeding table categories...");

                categories = new List<TableCategory>
                {
                    new TableCategory { Label = "Gender" },
                    new TableCategory { Label = "Hair Color" },
                    new TableCategory { Label = "Blood Type" }
                };

                await db.TableCategories.AddRangeAsync(categories);
                await db.SaveChangesAsync();
            }
            else
            {
                Console.WriteLine("Retrieving seed table categories...");

                categories = await db.TableCategories.ToListAsync();
            }

            if (! await db.TableData.AnyAsync())
            {
                Console.WriteLine("Seeding table data...");

                var gender = categories.FirstOrDefault(x => x.Label == "Gender");
                var hair = categories.FirstOrDefault(x => x.Label == "Hair Color");
                var blood = categories.FirstOrDefault(x => x.Label == "Blood Type");

                var data = new List<TableDatum>
                {
                    new TableDatum { TableCategoryId = gender.Id, Data = "Male" },
                    new TableDatum { TableCategoryId = gender.Id, Data = "Female" },
                    new TableDatum { TableCategoryId = hair.Id, Data = "Blonde" },
                    new TableDatum { TableCategoryId = hair.Id, Data = "Red" },
                    new TableDatum { TableCategoryId = hair.Id, Data = "Light Brown" },
                    new TableDatum { TableCategoryId = hair.Id, Data = "Brown" },
                    new TableDatum { TableCategoryId = hair.Id, Data = "Dark Brown" },
                    new TableDatum { TableCategoryId = hair.Id, Data = "Black" },
                    new TableDatum { TableCategoryId = hair.Id, Data = "Gray" },
                    new TableDatum { TableCategoryId = blood.Id, Data = "O Positive" },
                    new TableDatum { TableCategoryId = blood.Id, Data = "O Negative" },
                    new TableDatum { TableCategoryId = blood.Id, Data = "A Positive" },
                    new TableDatum { TableCategoryId = blood.Id, Data = "A Negative" },
                    new TableDatum { TableCategoryId = blood.Id, Data = "B Positive" },
                    new TableDatum { TableCategoryId = blood.Id, Data = "B Negative" },
                    new TableDatum { TableCategoryId = blood.Id, Data = "AB Positive" },
                    new TableDatum { TableCategoryId = blood.Id, Data = "AB Negative" }
                };

                await db.TableData.AddRangeAsync(data);
                await db.SaveChangesAsync();
            }
        }
    }
}