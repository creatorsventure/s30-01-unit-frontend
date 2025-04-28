import {GenericModelType} from '../../../shared/interfaces/Generic.model.type';

export interface IRole extends GenericModelType {
    organizationId: string;
    selectedPermissionIds: string[];
    selectedMenuIds: string[];
}
