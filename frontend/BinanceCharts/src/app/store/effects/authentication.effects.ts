import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { EAuthenticationActions, Signin, SigninFailure, SigninSuccess } from '../actions';
import { AuthenticationService } from 'src/app/services';

@Injectable()
export class AuthenticationEffects {
    constructor(
        private _actions: Actions,
        private authService: AuthenticationService
    ) { }

    signin$ = createEffect(() => {
        return this._actions.pipe(
            ofType<Signin>(EAuthenticationActions.Signin),
            switchMap((action) => {
                return this.authService.signin(action.username).pipe(
                    map((response) => {
                        return new SigninSuccess(response);
                    }),
                    catchError((error) => {
                        return of(new SigninFailure());
                    })
                )
            }),
            catchError(_ => of(new SigninFailure()))
        );
    })
}