import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;

  hardcoded_klines = [
    [1708502400000, "51568.64000000"],
    [1708503300000, "51618.61000000"],
    [1708504200000, "51767.87000000"],
    [1708505100000, "51651.07000000"],
    [1708506000000, "51667.85000000"],
    [1708506900000, "51527.52000000"],
    [1708507800000, "51343.99000000"],
    [1708508700000, "51261.36000000"],
    [1708509600000, "51095.10000000"],
    [1708510500000, "51058.99000000"],
    [1708511400000, "51268.68000000"],
    [1708512300000, "51262.88000000"],
    [1708513200000, "51271.10000000"],
    [1708514100000, "51214.22000000"],
    [1708515000000, "51075.90000000"],
    [1708515900000, "50966.01000000"],
    [1708516800000, "50965.53000000"],
    [1708517700000, "51092.48000000"],
    [1708518600000, "51231.03000000"],
    [1708519500000, "51364.78000000"]
  ];

  hardcoded_current_price = 51303.79853094;

  constructor() { }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.data = {
      labels: this.hardcoded_klines.map(x => {
        const date = new Date(x[0]);
        return date.toUTCString();
      }),
      datasets: [
        {
          label: 'Average Price',
          data: new Array(this.hardcoded_klines.length).fill(this.hardcoded_current_price),
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--blue-500')
        },
        {
          label: 'Open Price',
          data: this.hardcoded_klines.map(x => x[1]),
          fill: true,
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };
  }
}
