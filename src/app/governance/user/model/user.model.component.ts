import {GenericModelType} from '../../../shared/interfaces/Generic.model.type';

export interface IUser extends GenericModelType {
    userId: string;
    countryCode: string;
    mobileNumber: string;
    email: string;
    roleId: string;
}
