import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store';
import { Signin } from 'src/app/store/actions';
import { isAuthenticated } from 'src/app/store/selectors';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
    signinForm: FormGroup;

    get username() { return this.signinForm?.get('username')!; }

    isAuthenticated$ = this._store.select(isAuthenticated);

    constructor(
        private router: Router,
        private builder: FormBuilder,
        private _store: Store<IAppState>
    ) {
        this.signinForm = this.builder.group({
            'username': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        });
    }

    ngOnInit() {
        this.isAuthenticated$.subscribe(isAuth => {
            if (isAuth) {
                this.router.navigate(['/']);
            }
        });
    }

    signin() {
        this._store.dispatch(new Signin(this.signinForm.value['username']));
    }
}
