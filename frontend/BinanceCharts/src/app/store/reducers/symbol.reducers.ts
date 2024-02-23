import { ESymbolsActions, SymbolActions } from "../actions"
import { ISymbolsState, initialSymbolsState } from "../state"

export const symbolReducers = (
    state = initialSymbolsState,
    action: SymbolActions
): ISymbolsState => {
    switch (action.type) {
        case ESymbolsActions.GetSymbols:
        case ESymbolsActions.GetSymbolsFailure:
            return initialSymbolsState;
        case ESymbolsActions.GetSymbolsSuccess:
            return {
                ...state,
                symbols: action.symbols
            }
        default:
            return {
                ...state
            }
    }
}