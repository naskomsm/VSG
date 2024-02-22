import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ESymbolsActions, GetSymbols, GetSymbolsFailure, GetSymbolsSuccess } from '../actions';
import { SymbolsService } from 'src/app/services/symbols.service';

@Injectable()
export class SymbolEffects {
    constructor(
        private _actions: Actions,
        private symbolsService: SymbolsService
    ) { }

    getSymbols$ = createEffect(() => {
        return this._actions.pipe(
            ofType<GetSymbols>(ESymbolsActions.GetSymbols),
            switchMap((_) => {
                return this.symbolsService.getSymbols().pipe(
                    map((response) => {
                        return new GetSymbolsSuccess(response);
                    }),
                    catchError((error) => {
                        return of(new GetSymbolsFailure());
                    })
                )
            }),
            catchError(_ => of(new GetSymbolsFailure()))
        );
    })
}