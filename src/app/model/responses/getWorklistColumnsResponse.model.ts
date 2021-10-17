export interface ColumnResponse {
  id: number;
  caption: string;
  dataField: string;
  dataWidth: number;
  objectName: string;
  width: number;
  readOnly: boolean;
  numberFormat: string;
  backColor: string;
  foreColor: string;
  multiSelect: boolean;
  alternatingRows: number;
  aggregate: string;
  autoComplete: boolean;
}

export type GetWorklistColumnsResponseModel = ColumnResponse[];
