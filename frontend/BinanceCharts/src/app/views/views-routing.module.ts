import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ViewsListComponent } from "./components";

const routes: Routes = [
    { path: '', component: ViewsListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ViewsRoutingModule { }
