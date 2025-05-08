import {GenericModelType} from '../../../shared/interfaces/Generic.model.type';

export interface IBin extends GenericModelType {
    schemeId: string;
    type: string;
    instrumentType: string;
    start: number;
    end: number;
}
