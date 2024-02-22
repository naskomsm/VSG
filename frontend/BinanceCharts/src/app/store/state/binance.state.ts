import { IAveragePrice } from "src/app/models/averagePrice";
import { IKline } from "src/app/models/kline";

export interface IBinanceState {
    klines: IKline[];
    averagePrice?: IAveragePrice;
}

export const initialBinanceState: IBinanceState = {
    klines: []
}