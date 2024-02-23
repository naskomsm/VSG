import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ISaveView, IView } from "../models/view";
import { Paginated } from "../models/paginated";
import { IMessage } from "../models/message";

@Injectable({
    providedIn: 'root'
})
export class ViewsService {
    constructor(private httpClient: HttpClient) { }

    getViews() {
        return this.httpClient.get<Paginated<IView>>(
            `${environment.api}/api/views`
        )
    }

    deleteView(id: number) {
        return this.httpClient.delete<IMessage>(
            `${environment.api}/api/views/${id}`
        )
    }

    saveView(view: ISaveView) {
        return this.httpClient.post<IView>(
            `${environment.api}/api/views`, view
        )
    }
}
