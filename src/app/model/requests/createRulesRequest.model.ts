export interface RuleRequestModel {
  fieldId: number;
  value?: string | number;
  valueId?: number;
  operand?: string;
  beginRange?: string | number;
  endRange?: string | number;
}

export type CreateRulesRequestModel = RuleRequestModel[];
