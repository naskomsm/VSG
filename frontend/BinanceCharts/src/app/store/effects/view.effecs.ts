import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { DeleteView, DeleteViewFailure, DeleteViewSuccess, EViewsActions, GetViews, GetViewsFailure, GetViewsSuccess, SaveView, SaveViewFailure, SaveViewSuccess } from '../actions/view.actions';
import { ViewsService } from 'src/app/services/views.service';
import { IAppState } from '../state';
import { Store } from '@ngrx/store';

@Injectable()
export class ViewEffects {
    constructor(
        private _actions: Actions,
        private viewsService: ViewsService,
        private _store: Store<IAppState>
    ) { }

    saveView$ = createEffect(() => {
        return this._actions.pipe(
            ofType<SaveView>(EViewsActions.SaveView),
            switchMap((action) => {
                return this.viewsService.saveView(action.view).pipe(
                    map((response) => {
                        return new SaveViewSuccess(response);
                    }),
                    catchError((error) => {
                        return of(new SaveViewFailure());
                    })
                )
            }),
            catchError(_ => of(new SaveViewFailure()))
        );
    });

    getViews$ = createEffect(() => {
        return this._actions.pipe(
            ofType<GetViews>(EViewsActions.GetViews),
            switchMap((_) => {
                return this.viewsService.getViews().pipe(
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
    });

    deleteView$ = createEffect(() => {
        return this._actions.pipe(
            ofType<DeleteView>(EViewsActions.DeleteView),
            switchMap((action) => {
                return this.viewsService.deleteView(action.id).pipe(
                    map((response) => {
                        this._store.dispatch(new GetViews());
                        return new DeleteViewSuccess(response);
                    }),
                    catchError((error) => {
                        return of(new DeleteViewFailure());
                    })
                )
            }),
            catchError(_ => of(new DeleteViewFailure()))
        );
    });
}