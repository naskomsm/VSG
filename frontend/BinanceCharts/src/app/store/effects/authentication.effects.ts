import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { EAuthenticationActions, Signin, SigninFailure, SigninSuccess } from '../actions';
import { AuthenticationService } from 'src/app/services';
// import { MessageService } from 'primeng/api';

@Injectable()
export class AuthenticationEffects {
    constructor(
        private _actions: Actions,
        private authService: AuthenticationService,
        // private messageService: MessageService
    ) { }

    // Simulate effect
    signin$ = createEffect(() => {
        return this._actions.pipe(
            ofType<Signin>(EAuthenticationActions.Signin),
            switchMap((action) => {
                return this.authService.signin(action.username).pipe(
                    map((response) => {
                        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
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