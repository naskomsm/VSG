import { NgModule } from "@angular/core";
import { ChartComponent } from "./chart/chart.component";
import { ChartModule } from 'primeng/chart';

@NgModule({
    declarations: [ChartComponent],
    exports: [ChartComponent],
    imports: [ChartModule]
})
export class SharedModule { }