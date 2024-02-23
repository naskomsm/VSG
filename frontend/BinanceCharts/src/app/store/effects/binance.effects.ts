import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { EBinanceActions, GetAveragePrice, GetAveragePriceFailure, GetAveragePriceSuccess, GetKlines, GetKlinesFailure, GetKlinesSuccess } from '../actions';
import { BinanceService } from 'src/app/services/binance.service';

@Injectable()
export class BinanceEffects {
    constructor(
        private _actions: Actions,
        private binanceService: BinanceService
    ) { }

    getAveragePrice$ = createEffect(() => {
        return this._actions.pipe(
            ofType<GetAveragePrice>(EBinanceActions.GetAveragePrice),
            switchMap((action) => {
                return this.binanceService.getAveragePrice(action.symbol).pipe(
                    map((response) => {
                        return new GetAveragePriceSuccess(response);
                    }),
                    catchError((error) => {
                        return of(new GetAveragePriceFailure());
                    })
                )
            }),
            catchError(_ => of(new GetAveragePriceFailure()))
        );
    });

    getKlines$ = createEffect(() => {
        return this._actions.pipe(
            ofType<GetKlines>(EBinanceActions.GetKlines),
            switchMap((action) => {
                return this.binanceService.getKlines(action.symbol, action.interval).pipe(
                    map((response) => {
                        return new GetKlinesSuccess(response);
                    }),
                    catchError((error) => {
                        return of(new GetKlinesFailure());
                    })
                )
            }),
            catchError(_ => of(new GetKlinesFailure()))
        );
    });
}