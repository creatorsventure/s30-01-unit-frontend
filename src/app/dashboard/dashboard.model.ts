export interface IDashboard {
    countDtoList?: ICount[];
}

export interface ICount {
    title: string;
    icon: string;
    description: string;
    count: number;
}
