import { createSelector } from "@ngrx/store";
import { IAppState, IAuthenticationState } from "../state";

const authenticationState = (state: IAppState) => state.authenticationState;

export const isAuthenticated = createSelector(
    authenticationState,
    (state: IAuthenticationState) => state.isAuthenticated
);