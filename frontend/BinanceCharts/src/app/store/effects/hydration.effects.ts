// hydration.effects.ts
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import { IAppState } from "../state/app.state";
import * as HydrationActions from "../actions/hydration.actions";

@Injectable()
export class HydrationEffects implements OnInitEffects {
    hydrate$ = createEffect(() =>
        this.action$.pipe(
            ofType(HydrationActions.hydrate),
            map(() => {
                const storageValue = localStorage.getItem("state");
                if (storageValue) {
                    try {
                        const state = JSON.parse(atob(storageValue));
                        return HydrationActions.hydrateSuccess({ state });
                    } catch {
                        localStorage.removeItem("state");
                    }
                }
                return HydrationActions.hydrateFailure();
            })
        )
    );

    serialize$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(HydrationActions.hydrateSuccess, HydrationActions.hydrateFailure),
                switchMap(() => this.store),
                distinctUntilChanged(),
                tap((state) => localStorage.setItem("state", btoa(JSON.stringify(state))))
            ),
        { dispatch: false }
    );

    constructor(private action$: Actions, private store: Store<IAppState>) { }

    ngrxOnInitEffects(): Action {
        return HydrationActions.hydrate();
    }
}