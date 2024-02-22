import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { auditTime, combineLatest, defaultIfEmpty, exhaustAll, exhaustMap, filter, first, forkJoin, map, of, switchMap, take, takeLast, zip } from 'rxjs';
import { IAppState } from 'src/app/store';
import { GetAveragePrice, GetKlines, GetSymbols } from 'src/app/store/actions';
import { getAveragePrice, getKlines } from 'src/app/store/selectors/binance.selectors';
import { paginatedSymbols } from 'src/app/store/selectors/symbols.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  options: any;

  isLoading: boolean = true;
  symbolFormGroup: FormGroup = new FormGroup({ symbol: new FormControl() });
  intervalFormGroup: FormGroup = new FormGroup({ interval: new FormControl('15m') });

  symbols = this._store.select(paginatedSymbols);
  klins = this._store.select(getKlines);
  avgPrice = this._store.select(getAveragePrice);

  symbolOptions: any[] = [];

  intervalOptions: any[] = [
    { label: '15m', value: '15m' },
    { label: '1h', value: '1h' },
    { label: '4h', value: '4h' }
  ];

  constructor(private _store: Store<IAppState>, private route: ActivatedRoute) {
    this._store.dispatch(new GetSymbols());
    this.route.queryParams.subscribe(params => {
      const symbolId = params['symbolId'];
      const interval = params['interval'];

      // Get data
    });
  }

  changeSymbol(value: number) {
    this._store.dispatch(new GetAveragePrice(value));
    this._store.dispatch(new GetKlines(value, this.intervalFormGroup.value['interval']));
  }

  changeInterval(value: string) {
    this._store.dispatch(new GetAveragePrice(this.symbolFormGroup.value['symbol']));
    this._store.dispatch(new GetKlines(this.symbolFormGroup.value['symbol'], value));
  }

  viewAll() { }

  ngOnInit() {
    this.symbols.pipe(
      auditTime(100)
    ).subscribe(paginatedResult => {
      if (paginatedResult) {
        this.symbolOptions = paginatedResult.items.map(x => {
          return { label: x.name, value: x.id }
        });

        if (paginatedResult.totalCount > 0) {
          const defaultSelectedSymbolId = paginatedResult.items[0].id;

          // Set default value of symbol form
          this.symbolFormGroup = new FormGroup({
            symbol: new FormControl(defaultSelectedSymbolId)
          });

          this._store.dispatch(new GetAveragePrice(defaultSelectedSymbolId));
          this._store.dispatch(new GetKlines(defaultSelectedSymbolId, this.intervalFormGroup.value['interval']));
        }
      }
    })

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
    }

    zip(this.klins, this.avgPrice)
      .pipe(
        map(([klines, avgPrice]) => {
          this.data = {
            labels: klines.map(x => {
              const date = new Date(x.openTime);
              return date.toUTCString();
            }),
            datasets: [
              {
                label: 'Average Price',
                data: new Array(klines.length).fill(avgPrice?.price),
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
              },
              {
                label: 'Open Price',
                data: klines.map(x => x.openPrice),
                fill: true,
                borderColor: documentStyle.getPropertyValue('--orange-500'),
                tension: 0.4,
                backgroundColor: 'rgba(255,167,38,0.2)'
              }
            ]
          };
        })
      )
      .subscribe();
  }
}
