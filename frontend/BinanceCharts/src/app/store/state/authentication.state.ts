import { IUser } from "src/app/models/user";

export interface IAuthenticationState {
    isAuthenticated: boolean;
    user?: IUser;
}

export const initialAuthenticationState: IAuthenticationState = {
    isAuthenticated: false
}