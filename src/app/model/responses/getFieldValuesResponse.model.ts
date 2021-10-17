export interface FieldValueResponseModel {
  id: number;
  code: string;
  displayValue: string;
}

export type GetFieldValuesResponseModel = FieldValueResponseModel[];
