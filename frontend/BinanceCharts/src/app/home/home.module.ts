import { NgModule } from "@angular/core";
import { HomeComponent } from "./components";
import { HomeRoutingModule } from "./home-routing.module";
import { ChartModule } from 'primeng/chart';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [HomeRoutingModule, ChartModule]
})
export class HomeModule { }