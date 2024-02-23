import { createSelector } from "@ngrx/store";
import { IAppState, ISymbolsState } from "../state";

const symbolsState = (state: IAppState) => state.symbolsState;

export const paginatedSymbols = createSelector(
    symbolsState,
    (state: ISymbolsState) => state.symbols
);