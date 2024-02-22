import { IAuthenticationState, initialAuthenticationState } from "./authentication.state";
import { IBinanceState, initialBinanceState } from "./binance.state";
import { ISymbolsState, initialSymbolsState } from "./symbols.state";

export interface IAppState {
    authenticationState: IAuthenticationState;
    symbolsState: ISymbolsState;
    binanceState: IBinanceState;
}

export const initialAppState: IAppState = {
    authenticationState: initialAuthenticationState,
    symbolsState: initialSymbolsState,
    binanceState: initialBinanceState
};