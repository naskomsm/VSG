import { NgModule } from "@angular/core";
import { ChartComponent } from "./chart/chart.component";
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [ChartComponent],
    exports: [ChartComponent],
    imports: [ChartModule, CardModule, SelectButtonModule, ReactiveFormsModule, ButtonModule]
})
export class SharedModule { }