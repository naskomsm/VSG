import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state';
import { authenticationReducers } from './authentication.reducers';
import { symbolReducers } from './symbol.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
    authenticationState: authenticationReducers,
    symbolsState: symbolReducers
};
