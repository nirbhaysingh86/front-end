import { FieldType } from './responses/getFieldsResponse.model';

export interface RuleTypeOptionModel {
  id: number;
  ruleType: string;
  ruleSubCategory: FieldType;
}

export class FilterAdministrationWizardModel {
  ruleCategory = '';
  ruleTypeOptions: RuleTypeOptionModel[] = [];
}
