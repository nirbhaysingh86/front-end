export interface TableHeader {
  fieldType: string;
  fieldName: string;
  sortField?: string;
  hasCheckAll?: boolean;
  columnWidth?: number;
  footerContent?: string;
  readonly?: boolean;
}

export interface TableHeadersModel {
  fieldList: TableHeader[];
  expandData?: {
    fieldList: TableHeader[];
  };
}
