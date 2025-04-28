export interface GenericModelType {
    id?: number;
    name: string;
    description: string;
    status: boolean;
    createdAt?: Date;
    modifiedAt?: Date;
    createdBy?: string;
    modifiedBy?: string;
}
