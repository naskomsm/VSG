import { EViewsActions, ViewActions } from "../actions/view.actions";
import { IViewsState, initialViewsState } from "../state/view.state";

export const viewReducers = (
    state = initialViewsState,
    action: ViewActions
): IViewsState => {
    switch (action.type) {
        case EViewsActions.GetViews:
            return state;
        case EViewsActions.GetViewsSuccess:
            return {
                ...state,
                views: action.views
            }
        case EViewsActions.DeleteViewSuccess:
            return {
                ...state
            }
        case EViewsActions.GetViewsFailure:
            return initialViewsState;
        default:
            return {
                ...state
            }
    }
}