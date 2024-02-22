import { Action } from "@ngrx/store";
import { IAveragePrice } from "src/app/models/averagePrice";
import { IKline } from "src/app/models/kline";

export enum EBinanceActions {
    GetAveragePrice = '[Binance] Get average price attempt',
    GetAveragePriceSuccess = '[Binance] Get average price success',
    GetAveragePriceFailure = '[Binance] Get average price failure',
    GetKlines = '[Binance] Get k lines attempt',
    GetKlinesSuccess = '[Binance] Get k lines success',
    GetKlinesFailure = '[Binance] Get k lines failure'
}

export class GetAveragePrice implements Action {
    public readonly type = EBinanceActions.GetAveragePrice;
    constructor(public symbolId: number) { }
}

export class GetAveragePriceSuccess implements Action {
    public readonly type = EBinanceActions.GetAveragePriceSuccess;
    constructor(public averagePrice: IAveragePrice) { }
}

export class GetAveragePriceFailure implements Action {
    public readonly type = EBinanceActions.GetAveragePriceFailure;
    constructor() { }
}

export class GetKlines implements Action {
    public readonly type = EBinanceActions.GetKlines;
    constructor(public symbolId: number, public interval: string) { }
}

export class GetKlinesSuccess implements Action {
    public readonly type = EBinanceActions.GetKlinesSuccess;
    constructor(public klines: IKline[]) { }
}

export class GetKlinesFailure implements Action {
    public readonly type = EBinanceActions.GetKlinesFailure;
    constructor() { }
}

export type BinanceActions =
    | GetAveragePrice
    | GetAveragePriceSuccess
    | GetAveragePriceFailure
    | GetKlines
    | GetKlinesSuccess
    | GetKlinesFailure;