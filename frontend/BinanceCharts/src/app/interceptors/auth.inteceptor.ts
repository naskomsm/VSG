import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppState } from '../store';
import { Store } from '@ngrx/store';
import { getUser } from '../store/selectors';
import { exhaustMap, first, map } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _store: Store<IAppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this._store.select(getUser).pipe(
            first(),
            map((user) => {
                return user;
            }),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }

                const authReq = req.clone({
                    headers: req.headers.set('user', user?.name)
                });

                return next.handle(authReq);
            })
        )
    }
}