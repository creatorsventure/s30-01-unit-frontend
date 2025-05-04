import {GenericModelType} from '../../shared/interfaces/Generic.model.type';

export interface ISignup extends GenericModelType {
    userId: string;
    entityId?: string;
    entityCode: string;
    entityName: string;
    password: string;
    confirmPassword: string;
    mobileNumber: string;
    countryCode: string;
    email: string;
}
