import { IAuthenticationState, initialAuthenticationState } from "./authentication.state";

export interface IAppState {
    authenticationState: IAuthenticationState;
}

export const initialAppState: IAppState = {
    authenticationState: initialAuthenticationState
};