import {GenericModelType} from '../../../shared/interfaces/Generic.model.type';

export interface IMerchant extends GenericModelType {

    merchantCode: string;
    merchantId: string;
    legalName?: string;
    url: string;
    merchantCategoryId: string;
    bankIdentificationCode: string;
    type: string;
    adminName: string;
    adminUserId: string;
    adminEmail: string;
    adminMobileNumber: string;
    adminCountryCode: string;
    address: string;
}
