import { Action } from "@ngrx/store";
import { Paginated } from "src/app/models/paginated";
import { ISymbol } from "src/app/models/symbol";

export enum ESymbolsActions {
    GetSymbols = '[Symbols] Get symbols attempt',
    GetSymbolsSuccess = '[Symbols] Get symbols success',
    GetSymbolsFailure = '[Symbols] Get symbols failure',
}

export class GetSymbols implements Action {
    public readonly type = ESymbolsActions.GetSymbols;
    constructor(public page: number = 1, public perPage: number = 10) { }
}

export class GetSymbolsSuccess implements Action {
    public readonly type = ESymbolsActions.GetSymbolsSuccess;
    constructor(public symbols: Paginated<ISymbol>) { }
}

export class GetSymbolsFailure implements Action {
    public readonly type = ESymbolsActions.GetSymbolsFailure;
    constructor() { }
}

export type SymbolActions =
    | GetSymbols
    | GetSymbolsSuccess
    | GetSymbolsFailure;