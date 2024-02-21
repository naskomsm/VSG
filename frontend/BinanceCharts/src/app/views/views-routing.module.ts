import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ViewsListComponent } from "./components";
import { ViewDetailsComponent } from "./components/details/view-details.component";

const routes: Routes = [
    { path: '', component: ViewsListComponent },
    { path: ':id', component: ViewDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ViewsRoutingModule { }
