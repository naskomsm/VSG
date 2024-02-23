import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration.reducers';

export * from './authentication.reducers';
export * from './binance.reducers';
export * from './hydration.reducers';
export * from './app.reducers';
export * from './symbol.reducers';
export * from './view.reducers';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];