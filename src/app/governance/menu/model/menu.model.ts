import {GenericModelType} from '../../../shared/interfaces/Generic.model.type';

export interface IMenu extends GenericModelType {
    path?: string;
    icon?: string;
    iconType?: string;
    iconTheme?: string;
    rootMenuId?: number;
    displayPosition: number;
    menuType?: number;
    moduleId?: string;
    submenu?: any[];
    dashboardCountCard: boolean;
}
