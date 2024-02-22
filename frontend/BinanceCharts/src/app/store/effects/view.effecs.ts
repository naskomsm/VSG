import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { EViewsActions, GetViews, GetViewsFailure, GetViewsSuccess } from '../actions/view.actions';
import { ViewsService } from 'src/app/services/views.service';

@Injectable()
export class ViewEffects {
    constructor(
        private _actions: Actions,
        private ViewsService: ViewsService
    ) { }

    getViews$ = createEffect(() => {
        return this._actions.pipe(
            ofType<GetViews>(EViewsActions.GetViews),
            switchMap((_) => {
                return this.ViewsService.getViews().pipe(
                    map((response) => {
                        return new GetViewsSuccess(response);
                    }),
                    catchError((error) => {
                        return of(new GetViewsFailure());
                    })
                )
            }),
            catchError(_ => of(new GetViewsFailure()))
        );
    })
}