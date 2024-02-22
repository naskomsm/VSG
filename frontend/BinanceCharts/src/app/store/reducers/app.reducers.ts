import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state';
import { authenticationReducers } from './authentication.reducers';
import { symbolReducers } from './symbol.reducers';
import { binanceReducers } from './binance.reducer';
import { viewReducers } from './view.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
    authenticationState: authenticationReducers,
    symbolsState: symbolReducers,
    binanceState: binanceReducers,
    viewsState: viewReducers
};
