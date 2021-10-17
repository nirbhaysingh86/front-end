export interface RuleResponse {
  beginRange: string;
  endRange: string;
  fieldId: number;
  fieldName: string;
  id: number;
  operand: string;
  value: string;
  valueId: string;
}

export type GetRulesResponseModel = RuleResponse[];
