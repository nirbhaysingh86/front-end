import { ColumnModel } from '../column.model';

export interface LayoutResponse {
  id: number;
  name: string;
  userId?: number;
  description: string;
  isDefault: boolean;
  columns: ColumnModel[];
}

export type GetLayoutsResponseModel = LayoutResponse[];
