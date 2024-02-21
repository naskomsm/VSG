import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    signinForm: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
        // Example
        this.signinForm = this.fb.group({
            'email': ['', [Validators.required, Validators.email]],
            'password': ['', [Validators.required]]
        });
    }

    signin() {
        // TODO..
    }
}
