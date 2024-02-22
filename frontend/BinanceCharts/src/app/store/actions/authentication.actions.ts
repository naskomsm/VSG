import { Action } from "@ngrx/store";

export enum EAuthenticationActions {
    Signin = '[Signin] Sign in attempt',
    SigninSuccess = '[Signin] Sign in success',
    SigninFailure = '[Signin] Sign in failure',
    Signup = '[Signup] Sign up attempt',
    SignupSuccess = '[Signup] Sign up success',
    SignupFailure = '[Signup] Sign up failure',
    Logout = '[Logout] Logout',
}

export class Signin implements Action {
    public readonly type = EAuthenticationActions.Signin;
    constructor() { }
}

export class SigninSuccess implements Action {
    public readonly type = EAuthenticationActions.SigninSuccess;
    constructor() { }
}

export class SigninFailure implements Action {
    public readonly type = EAuthenticationActions.SigninFailure;
    constructor() { }
}

export class Signup implements Action {
    public readonly type = EAuthenticationActions.Signup;
    constructor() { }
}

export class SignupSuccess implements Action {
    public readonly type = EAuthenticationActions.SignupSuccess;
    constructor() { }
}

export class SignupFailure implements Action {
    public readonly type = EAuthenticationActions.SignupFailure;
    constructor() { }
}

export class Logout implements Action {
    public readonly type = EAuthenticationActions.Logout;
}

export type AuthenticationActions =
    | Signin
    | SigninSuccess
    | SigninFailure
    | Signup
    | SignupSuccess
    | SignupFailure
    | Logout;