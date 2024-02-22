import { ESymbolsActions, SymbolActions } from "../actions"
import { ISymbolsState, initialSymbolsState } from "../state"

export const symbolReducers = (
    state = initialSymbolsState,
    action: SymbolActions
): ISymbolsState => {
    switch (action.type) {
        case ESymbolsActions.GetSymbols:
            return state;
        case ESymbolsActions.GetSymbolsSuccess:
            return {
                ...state,
                symbols: action.symbols
            }
        case ESymbolsActions.GetSymbolsFailure:
            return initialSymbolsState;
        default:
            return {
                ...state
            }
    }
}