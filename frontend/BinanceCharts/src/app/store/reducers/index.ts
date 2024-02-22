import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration.reducer';

export * from './authentication.reducers';
export * from './hydration.reducer';
export * from './app.reducers';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];