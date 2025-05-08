import {GenericModelType} from '../../../shared/interfaces/Generic.model.type';

export interface IDevice extends GenericModelType {
    selectedMerchantId: string;
    selectedUnitOptionsId: string;
    selectedUnitKeyId: string;
    currencyList: string[];
    schemeList: string[];
    actionList: string[];
    engineList: string[];
}
