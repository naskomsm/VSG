import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, zip } from 'rxjs';
import { ISaveView } from 'src/app/models/view';
import { IAppState } from 'src/app/store';
import { GetAveragePrice, GetKlines, GetSymbols } from 'src/app/store/actions';
import { SaveView } from 'src/app/store/actions/view.actions';
import { getUser } from 'src/app/store/selectors';
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

  skeletonActive: boolean = true;
  symbolFormGroup: FormGroup = new FormGroup({ symbol: new FormControl() });
  intervalFormGroup: FormGroup = new FormGroup({ interval: new FormControl('15m') });

  user = this._store.select(getUser);
  symbols = this._store.select(paginatedSymbols);
  klins = this._store.select(getKlines);
  avgPrice = this._store.select(getAveragePrice);

  userId!: number;

  symbolOptions: any[] = [];

  intervalOptions: any[] = [
    { label: '15m', value: '15m' },
    { label: '1h', value: '1h' },
    { label: '4h', value: '4h' }
  ];

  constructor(
    private _store: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this._store.dispatch(new GetSymbols());
    this.user.subscribe(user => {
      if (user) {
        this.userId = user.id;
      }
    });

    this.route.queryParams.subscribe(params => {
      const symbolParam = params['symbol'];
      const intervalParam = params['interval'];

      this.symbols.pipe(
      ).subscribe(symbols => {
        if (symbols) {
          this.symbolOptions = symbols.items.map(x => {
            return { label: x.name, value: x.name }
          });

          let symbol = symbols.items[0].name!;
          let interval = this.intervalOptions[0].label;

          if (symbolParam) {
            symbol = symbolParam;
          }

          if (intervalParam) {
            interval = intervalParam
          }

          this.symbolFormGroup = new FormGroup({ symbol: new FormControl(symbol) });
          this.intervalFormGroup = new FormGroup({ interval: new FormControl(interval) });

          this._store.dispatch(new GetAveragePrice(symbol));
          this._store.dispatch(new GetKlines(symbol, interval));
        }
      });
    });

  }

  changeSymbol(value: number) {
    this.router.navigate(['/'], { queryParams: { symbol: value, interval: this.intervalFormGroup.value['interval'] } });
  }

  changeInterval(value: string) {
    this.router.navigate(['/'], { queryParams: { symbol: this.symbolFormGroup.value['symbol'], interval: value } });
  }

  saveView() {
    const saveView: ISaveView = {
      userId: this.userId,
      symbol: this.symbolFormGroup.value['symbol'],
      interval: this.intervalFormGroup.value['interval']
    };

    this._store.dispatch(new SaveView(saveView));
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

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

          this.skeletonActive = false;
        })
      )
      .subscribe();

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
  }
}
