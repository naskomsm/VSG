import { createAction, props } from "@ngrx/store";
import { IAppState } from "../state/app.state";

export const hydrate = createAction("[Hydration] Hydrate");

export const hydrateSuccess = createAction(
    "[Hydration] Hydrate Success",
    props<{ state: IAppState }>()
);

export const hydrateFailure = createAction("[Hydration] Hydrate Failure");