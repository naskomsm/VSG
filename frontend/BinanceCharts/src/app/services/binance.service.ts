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

    getAveragePrice(symbolId: number) {
        return this.httpClient.get<IAveragePrice>(
            `${environment.api}/api/Binance/average-price?symbolId=${symbolId}`
        )
    }

    getKlines(symbolId: number, interval: string) {
        return this.httpClient.get<IKline[]>(
            `${environment.api}/api/Binance/klines?symbolId=${symbolId}&Interval=${interval}`
        )
    }
}
