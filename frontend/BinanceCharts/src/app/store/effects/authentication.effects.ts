import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of } from 'rxjs';
import { EAuthenticationActions, SigninFailure, SigninSuccess } from '../actions';

@Injectable()
export class AuthenticationEffects {
    constructor(private _actions: Actions) { }

    // Simulate effect
    signin$ = createEffect(() => {
        return this._actions.pipe(
            ofType(EAuthenticationActions.Signin),
            map(_ => {
                return new SigninSuccess()
            }),
            catchError(_ => of(new SigninFailure()))
        );
    })
}