import { AuthenticationActions, EAuthenticationActions } from "../actions"
import { IAuthenticationState, initialAuthenticationState } from "../state"

export const authenticationReducers = (
    state = initialAuthenticationState,
    action: AuthenticationActions
): IAuthenticationState => {
    switch (action.type) {
        case EAuthenticationActions.Signin:
        case EAuthenticationActions.Signup:
            return state;
        case EAuthenticationActions.SignupSuccess:
        case EAuthenticationActions.SigninSuccess:
            return {
                ...state,
                isAuthenticated: true
            }
        case EAuthenticationActions.SigninFailure:
        case EAuthenticationActions.SignupFailure:
            return initialAuthenticationState;
        default:
            return {
                ...state
            }
    }
}