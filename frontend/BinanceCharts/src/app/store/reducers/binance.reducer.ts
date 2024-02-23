import { BinanceActions, EBinanceActions } from "../actions"
import { IBinanceState, initialBinanceState } from "../state/binance.state";

export const binanceReducers = (
    state = initialBinanceState,
    action: BinanceActions
): IBinanceState => {
    switch (action.type) {
        case EBinanceActions.GetKlines:
        case EBinanceActions.GetAveragePrice:
            return initialBinanceState;
        case EBinanceActions.GetKlinesSuccess:
            return {
                ...state,
                klines: action.klines
            }
        case EBinanceActions.GetAveragePriceSuccess:
            return {
                ...state,
                averagePrice: action.averagePrice
            }
        case EBinanceActions.GetKlinesFailure:
        case EBinanceActions.GetAveragePrice:
            return state;
        default:
            return {
                ...state
            }
    }
}