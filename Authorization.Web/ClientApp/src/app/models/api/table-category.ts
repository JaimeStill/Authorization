import { TableDatum } from './table-datum';

export interface TableCategory {
  id: number;
  label: string;
  isDeleted: boolean;

  tableData: TableDatum[];
}
