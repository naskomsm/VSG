import { IAuthenticationState, initialAuthenticationState } from "./authentication.state";
import { IBinanceState, initialBinanceState } from "./binance.state";
import { ISymbolsState, initialSymbolsState } from "./symbols.state";
import { IViewsState, initialViewsState } from "./view.state";

export interface IAppState {
    authenticationState: IAuthenticationState;
    symbolsState: ISymbolsState;
    binanceState: IBinanceState;
    viewsState: IViewsState;
}

export const initialAppState: IAppState = {
    authenticationState: initialAuthenticationState,
    symbolsState: initialSymbolsState,
    binanceState: initialBinanceState,
    viewsState: initialViewsState
};