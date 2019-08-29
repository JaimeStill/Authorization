using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Authorization.Data.Entities;

namespace Authorization.Data.Extensions
{
    public static class DataExtensions
    {
        public static async Task<List<TableCategory>> GetCategories(this AppDbContext db, bool isDeleted = false)
        {
            var categories = await db.TableCategories
                .Where(x => x.IsDeleted == isDeleted)
                .OrderBy(x => x.Label)
                .ToListAsync();

            return categories;
        }

        public static async Task<List<TableCategory>> SearchCategories(this AppDbContext db, string search, bool isDeleted = false)
        {
            var categories = await db.TableCategories
                .Where(x =>
                    x.IsDeleted == isDeleted &&
                    x.Label.ToLower().Contains(search.ToLower())
                )
                .OrderBy(x => x.Label)
                .ToListAsync();

            return categories;
        }

        public static async Task<TableCategory> GetCategory(this AppDbContext db, int categoryId)
        {
            var category = await db.TableCategories.FindAsync(categoryId);

            return category;
        }

        public static async Task AddCategory(this AppDbContext db, TableCategory category)
        {
            if (await category.Validate(db))
            {
                await db.TableCategories.AddAsync(category);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateCategory(this AppDbContext db, TableCategory category)
        {
            if (await category.Validate(db))
            {
                db.TableCategories.Update(category);
                await db.SaveChangesAsync();
            }
        }

        public static async Task ToggleCategoryDeleted(this AppDbContext db, TableCategory category)
        {
            db.TableCategories.Attach(category);
            category.IsDeleted = !category.IsDeleted;
            await db.SaveChangesAsync();
        }

        public static async Task RemoveCategory(this AppDbContext db, TableCategory category)
        {
            db.TableCategories.Remove(category);
            await db.SaveChangesAsync();
        }

        public static async Task<List<TableDatum>> GetData(this AppDbContext db, bool isDeleted = false)
        {
            var data = await db.TableData
                .Include(x => x.TableCategory)
                .Where(x => x.IsDeleted == isDeleted)
                .OrderBy(x => x.Data)
                .OrderBy(x => x.TableCategory.Label)
                .ToListAsync();

            return data;
        }

        public static async Task<List<TableDatum>> SearchData(this AppDbContext db, string search, bool isDeleted = false)
        {
            var data = await db.TableData
                .Include(x => x.TableCategory)
                .Where(x =>
                    x.IsDeleted == isDeleted &&
                    (x.Data.ToLower().Contains(search.ToLower()) ||
                    x.TableCategory.Label.ToLower().Contains(search.ToLower()))
                )
                .OrderBy(x => x.Data)
                .OrderBy(x => x.TableCategory.Label)
                .ToListAsync();

            return data;
        }

        public static async Task<List<TableDatum>> GetDataByCategory(this AppDbContext db, int categoryId)
        {
            var data = await db.TableData
                .Include(x => x.TableCategory)
                .Where(x =>
                    !x.IsDeleted &&
                    x.TableCategoryId == categoryId
                )
                .OrderBy(x => x.Data)
                .ToListAsync();

            return data;
        }

        public static async Task<List<TableDatum>> SearchDataByCategory(this AppDbContext db, int categoryId, string search)
        {
            var data = await db.TableData
                .Include(x => x.TableCategory)
                .Where(x =>
                    !x.IsDeleted &&
                    x.TableCategoryId == categoryId &&
                    x.Data.ToLower().Contains(search.ToLower())
                )
                .OrderBy(x => x.Data)
                .ToListAsync();

            return data;
        }

        public static async Task<TableDatum> GetDatum(this AppDbContext db, int datumId)
        {
            var datum = await db.TableData
                .Include(x => x.TableCategory)
                .FirstOrDefaultAsync(x => x.Id == datumId);

            return datum;
        }

        public static async Task AddDatum(this AppDbContext db, TableDatum datum)
        {
            if (await datum.Validate(db))
            {
                await db.TableData.AddAsync(datum);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateDatum(this AppDbContext db, TableDatum datum)
        {
            if (await datum.Validate(db))
            {
                db.TableData.Update(datum);
                await db.SaveChangesAsync();
            }
        }

        public static async Task ToggleDatumDeleted(this AppDbContext db, TableDatum datum)
        {
            db.TableData.Attach(datum);
            datum.IsDeleted = !datum.IsDeleted;
            await db.SaveChangesAsync();
        }

        public static async Task RemoveDatum(this AppDbContext db, TableDatum datum)
        {
            db.TableData.Remove(datum);
            await db.SaveChangesAsync();
        }

        public static async Task<bool> Validate(this TableCategory category, AppDbContext db)
        {
            if (string.IsNullOrEmpty(category.Label))
            {
                throw new Exception("A category must have a label");
            }

            var check = await db.TableCategories
                .FirstOrDefaultAsync(x =>
                    x.Id != category.Id &&
                    x.Label.ToLower() == category.Label.ToLower()
                );

            if (check != null)
            {
                throw new Exception($"Category {category.Label} already exists");
            }

            return true;
        }

        public static async Task<bool> Validate(this TableDatum data, AppDbContext db)
        {
            if (string.IsNullOrEmpty(data.Data))
            {
                throw new Exception("Data must have a value");
            }

            if (data.TableCategoryId < 1)
            {
                throw new Exception("Data must be associated with a category");
            }

            var check = await db.TableData
                .FirstOrDefaultAsync(x =>
                    x.Id != data.Id &&
                    x.TableCategoryId == data.TableCategoryId &&
                    x.Data.ToLower() == data.Data.ToLower()
                );

            if (check != null)
            {
                throw new Exception($"Data {data.Data} already exists in this category");
            }

            return true;
        }
    }
}