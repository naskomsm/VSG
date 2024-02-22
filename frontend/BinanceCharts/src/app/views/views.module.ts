import { NgModule } from "@angular/core";
import { ViewsListComponent } from "./components";
import { ViewsRoutingModule } from "./views-routing.module";
import { TableModule } from 'primeng/table';
import { CommonModule } from "@angular/common";
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        ViewsListComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        ViewsRoutingModule
    ]
})
export class ViewsModule { }