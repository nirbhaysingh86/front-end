export type FieldType = 'Number' | 'DateRange' | 'DateTimeRange' | 'Percent' | 'Text' | 'Values' | '';

interface FieldResponse {
  id: number;
  name: string;
  category: string;
  description: string;
  selectionType: FieldType;
}

export type GetFieldsResponseModel = FieldResponse[];
