import {GenericModelType} from '../../../shared/interfaces/Generic.model.type';

export interface IPassword extends GenericModelType {
    password: string;
    confirmPassword: string;
    userDetailId?: string;
}
