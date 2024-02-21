import { NgModule } from "@angular/core";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SigninComponent } from "./components";

@NgModule({
    declarations: [
        SigninComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule
    ]
})
export class AuthenticationModule { }