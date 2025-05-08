import {GenericModelType} from '../../../shared/interfaces/Generic.model.type';

export interface IUnitKey extends GenericModelType {

    commonName: string;
    organization: string;
    organizationalUnit: string;
    locality: string;
    state: string;
    country: string;
    email: string;
    validityYears: string;
    unitPrivateKeyPassword: string;

}
