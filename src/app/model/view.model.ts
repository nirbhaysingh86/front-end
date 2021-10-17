import { ViewLimitsModel } from './viewLimits.model';

export interface ViewModel {
  id?: number;
  description: string;
  isDefault: boolean;
  limits: ViewLimitsModel;
  name: string;
}
