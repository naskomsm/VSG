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

    symbolFormGroup!: FormGroup;
    intervalFormGroup!: FormGroup;

    symbolOptions: any[] = [
        { label: 'BTCUSDT', value: 'BTCUSDT' },
        { label: 'ETCUSDT', value: 'ETCUSDT' },
        { label: 'XRPUSDT', value: 'XRPUSDT' }
    ];

    intervalOptions: any[] = [
        { label: '15m', value: '15m' },
        { label: '1h', value: '1h' },
        { label: '4h', value: '4h' }
    ];

    ngOnInit() {
        this.symbolFormGroup = new FormGroup({
            value: new FormControl('BTCUSDT')
        });

        this.intervalFormGroup = new FormGroup({
            value: new FormControl('15m')
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
