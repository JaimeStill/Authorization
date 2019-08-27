using System.Collections.Generic;

namespace Authorization.Data.Entities
{
    public class TableCategory
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public bool IsDeleted { get; set; }

        public List<TableDatum> TableData { get; set; }
    }
}