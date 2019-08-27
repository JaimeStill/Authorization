import { TableCategory } from './table-category';

export interface TableDatum {
  id: number;
  tableCategoryId: number;
  data: string;
  isDeleted: boolean;

  tableCategory: TableCategory;
}
