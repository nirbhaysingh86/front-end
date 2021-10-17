interface ExpandData {
  fieldList: {
    fieldType?: string;
    fieldName?: string;
    fieldValue: string;
  }[];
}

export class TableModel {
  id = 0;
  fieldList: {
    fieldType?: string; // only need to set in first row data of table
    fieldName?: string; // only need to set in first row data of table
    fieldValue: any; // this need to be setted in each row data of table
    hasCheckAll?: boolean; // only need to set in first row data of table
    columnWidth?: number; // only need to set in first row data of table
    footerContent?: string; // only need to set in first row data of table
    readonly?: boolean; // only need to set in first row data of table
  }[] = [];
  expandData: ExpandData[] | null = null;
  checked = false;
  hidden = false;
  origin?: any;
}
