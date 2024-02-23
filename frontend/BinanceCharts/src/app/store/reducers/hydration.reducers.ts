import { Action, ActionReducer } from "@ngrx/store";
import * as HydrationActions from "../actions/hydration.actions";
import { IAppState } from "../state/app.state";

function isHydrateSuccess(
    action: Action
): action is ReturnType<typeof HydrationActions.hydrateSuccess> {
    return action.type === HydrationActions.hydrateSuccess.type;
}

export const hydrationMetaReducer = (
    reducer: ActionReducer<IAppState>
): ActionReducer<IAppState> => {
    return (state, action) => {
        if (isHydrateSuccess(action)) {
            return action.state;
        } else {
            return reducer(state, action);
        }
    };
};