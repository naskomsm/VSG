import { IAuthenticationState, initialAuthenticationState } from "./authentication.state";
import { ISymbolsState, initialSymbolsState } from "./symbols.state";

export interface IAppState {
    authenticationState: IAuthenticationState;
    symbolsState: ISymbolsState;
}

export const initialAppState: IAppState = {
    authenticationState: initialAuthenticationState,
    symbolsState: initialSymbolsState
};