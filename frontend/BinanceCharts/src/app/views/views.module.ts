import { NgModule } from "@angular/core";
import { ViewsListComponent } from "./components";
import { ViewsRoutingModule } from "./views-routing.module";

@NgModule({
    declarations: [
        ViewsListComponent
    ],
    imports: [
        ViewsRoutingModule
    ]
})
export class ViewsModule { }