export interface CreateLayoutRequestModel {
  name: string;
  description: string;
  isDefault: boolean;
  columns: {
    fieldName: string;
    location: number;
    width: number;
    isVisible: boolean;
  }[];
}
