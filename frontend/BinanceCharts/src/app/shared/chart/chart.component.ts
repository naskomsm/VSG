import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']

})
export class ChartComponent implements OnInit {
    @Input() data: any;
    options: any;

    formGroup!: FormGroup;

    stateOptions: any[] = [
        { label: 'BTCUSDT', value: 'BTCUSDT' },
        { label: 'ETCUSDT', value: 'ETCUSDT' },
        { label: 'XRPUSDT', value: 'XRPUSDT' }
    ];


    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl('BTCUSDT')
        });

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }
}
