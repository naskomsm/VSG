import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { IAppState } from "../store";
import { isAuthenticated } from "../store/selectors";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private store: Store<IAppState>,
        private route: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isAuthenticated),
            tap(isAuthenticated => {
                if (!isAuthenticated) {
                    this.route.navigateByUrl('/auth/signin');
                }
            })
        )
    }
}