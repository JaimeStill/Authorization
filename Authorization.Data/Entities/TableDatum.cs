namespace Authorization.Data.Entities
{
    public class TableDatum
    {
        public int Id { get; set; }
        public int TableCategoryId { get; set; }
        public string Data { get; set; }
        public bool IsDeleted { get; set; }

        public TableCategory TableCategory { get; set; }
    }
}