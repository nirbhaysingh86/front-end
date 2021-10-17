import { CreateViewRequestModel } from '../requests/createViewRequest.model';

export interface CreateViewResponseModel extends CreateViewRequestModel {
  id: number;
}
