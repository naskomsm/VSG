import { Paginated } from "src/app/models/paginated";
import { ISymbol } from "src/app/models/symbol";

export interface ISymbolsState {
    symbols?: Paginated<ISymbol>;
}

export const initialSymbolsState: ISymbolsState = {}