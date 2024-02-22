import { NgModule } from "@angular/core";
import { HomeComponent } from "./components";
import { HomeRoutingModule } from "./home-routing.module";
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ChartModule,
        CardModule,
        SelectButtonModule,
        ReactiveFormsModule,
        ButtonModule
    ]
})
export class HomeModule { }