using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Authorization.Data;
using Authorization.Data.Entities;
using Authorization.Data.Extensions;

namespace Authorization.Web.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        private AppDbContext db;

        public DataController(AppDbContext db)
        {
            this.db = db;
        }
        
        [HttpGet("[action]")]
        public async Task<List<TableCategory>> GetCategories() => await db.GetCategories();

        [HttpGet("[action]/{search}")]
        public async Task<List<TableCategory>> SearchCategories([FromRoute]string search) => await db.SearchCategories(search);

        [HttpGet("[action]")]
        public async Task<List<TableCategory>> GetDeletedCategories() => await db.GetCategories(true);

        [HttpGet("[action]/{search}")]
        public async Task<List<TableCategory>> SearchDeletedCategories([FromRoute]string search) => await db.SearchCategories(search, true);

        [HttpGet("[action]")]
        public async Task<List<TableCategory>> GetCategoriesWithData() => await db.GetCategoriesWithData();

        [HttpGet("[action]/{search}")]
        public async Task<List<TableCategory>> SearchCategoriesWithData([FromRoute]string search) => await db.SearchCategoriesWithData(search);

        [HttpGet("[action]/{categoryId}")]
        public async Task<TableCategory> GetCategory([FromRoute]int categoryId) => await db.GetCategory(categoryId);

        [HttpGet("[action]/{categoryId}")]
        public async Task<TableCategory> GetCategoryWithData([FromRoute]int categoryId) => await db.GetCategoryWithData(categoryId);

        [HttpPost("[action]")]
        public async Task AddCategory([FromBody]TableCategory category) => await db.AddCategory(category);

        [HttpPost("[action]")]
        public async Task UpdateCategory([FromBody]TableCategory category) => await db.UpdateCategory(category);

        [HttpPost("[action]")]
        public async Task ToggleCategoryDeleted([FromBody]TableCategory category) => await db.ToggleCategoryDeleted(category);

        [HttpPost("[action]")]
        public async Task RemoveCategory([FromBody]TableCategory category) => await db.RemoveCategory(category);

        [HttpGet("[action]")]
        public async Task<List<TableDatum>> GetData() => await db.GetData();

        [HttpGet("[action]/{search}")]
        public async Task<List<TableDatum>> SearchData([FromRoute]string search) => await db.SearchData(search);

        [HttpGet("[action]")]
        public async Task<List<TableDatum>> GetDeletedData() => await db.GetData(true);

        [HttpGet("[action]/{search}")]
        public async Task<List<TableDatum>> SearchDeletedData([FromRoute]string search) => await db.SearchData(search, true);

        [HttpGet("[action]/{categoryId}")]
        public async Task<List<TableDatum>> GetDataByCategory([FromRoute]int categoryId) => await db.GetDataByCategory(categoryId);

        [HttpGet("[action]/{categoryId}/{search}")]
        public async Task<List<TableDatum>> SearchDataByCategory([FromRoute]int categoryId, [FromRoute]string search) => 
            await db.SearchDataByCategory(categoryId, search);

        [HttpGet("[action]/{datumId}")]
        public async Task<TableDatum> GetDatum([FromRoute]int datumId) => await db.GetDatum(datumId);

        [HttpPost("[action]")]
        public async Task AddDatum([FromBody]TableDatum datum) => await db.AddDatum(datum);

        [HttpPost("[action]")]
        public async Task UpdateDatum([FromBody]TableDatum datum) => await db.UpdateDatum(datum);

        [HttpPost("[action]")]
        public async Task ToggleDatumDeleted([FromBody]TableDatum datum) => await db.ToggleDatumDeleted(datum);

        [HttpPost("[action]")]
        public async Task RemoveDatum([FromBody]TableDatum datum) => await db.RemoveDatum(datum);
    }
}