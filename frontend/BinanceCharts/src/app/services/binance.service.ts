import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IKline } from "../models/kline";
import { IAveragePrice } from "../models/averagePrice";

@Injectable({
    providedIn: 'root'
})
export class BinanceService {
    constructor(private httpClient: HttpClient) { }

    getAveragePrice(symbol: string) {
        return this.httpClient.get<IAveragePrice>(
            `${environment.api}/api/Binance/average-price?symbol=${symbol}`
        )
    }

    getKlines(symbol: string, interval: string) {
        return this.httpClient.get<IKline[]>(
            `${environment.api}/api/Binance/klines?symbol=${symbol}&Interval=${interval}`
        )
    }
}
