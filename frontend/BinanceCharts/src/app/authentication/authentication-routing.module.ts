import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SigninComponent } from "./components";

const routes: Routes = [
    { path: 'signin', component: SigninComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
