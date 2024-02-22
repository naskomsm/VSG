import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Paginated } from "../models/paginated";
import { ISymbol } from "../models/symbol";

@Injectable({
    providedIn: 'root'
})
export class SymbolsService {
    constructor(private httpClient: HttpClient) { }

    getSymbols() {
        return this.httpClient.get<Paginated<ISymbol>>(
            `${environment.api}/api/symbols`
        )
    }
}
