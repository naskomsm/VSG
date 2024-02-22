import { createSelector } from "@ngrx/store";
import { IAppState, ISymbolsState } from "../state";
import { IViewsState } from "../state/view.state";

const viewsState = (state: IAppState) => state.viewsState;

export const paginatedViews = createSelector(
    viewsState,
    (state: IViewsState) => state.views
);