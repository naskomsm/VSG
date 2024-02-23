export interface IView {
    id: number;
    symbol: string;
    period: string;
}

export interface ISaveView {
    userId: number;
    symbol: string;
    interval: string;
}