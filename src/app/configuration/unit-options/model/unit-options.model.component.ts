import {GenericModelType} from '../../../shared/interfaces/Generic.model.type';

export interface IUnitOptions extends GenericModelType {
    partial: boolean;
    allowExcess: boolean;
}
