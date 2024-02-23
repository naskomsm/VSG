import { createSelector } from "@ngrx/store";
import { IAppState } from "../state";
import { IBinanceState } from "../state/binance.state";

const binanceState = (state: IAppState) => state.binanceState;

export const getKlines = createSelector(
    binanceState,
    (state: IBinanceState) => state.klines
);

export const getAveragePrice = createSelector(
    binanceState,
    (state: IBinanceState) => state.averagePrice
);