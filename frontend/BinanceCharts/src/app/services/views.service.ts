import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IView } from "../models/view";
import { Paginated } from "../models/paginated";

@Injectable({
    providedIn: 'root'
})
export class ViewsService {
    constructor(private httpClient: HttpClient) { }

    getViews() {
        return this.httpClient.get<Paginated<IView>>(
            `${environment.api}/api/Views`
        )
    }
}
