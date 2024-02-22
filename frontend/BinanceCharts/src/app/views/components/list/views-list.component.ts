import { Component, OnInit } from "@angular/core";
import { IView } from "src/app/models/view";

@Component({
    selector: 'app-views-list',
    templateUrl: './views-list.component.html',
    styleUrls: ['./views-list.component.css']
})
export class ViewsListComponent {
    views: IView[] = [
        { id: 1, symbol: "BTCUSDT", period: "30m" },
        { id: 2, symbol: "XRPUSDT", period: "1h" },
        { id: 3, symbol: "XRPUSDT", period: "1h" },
        { id: 4, symbol: "BTCUSDT", period: "30m" },
        { id: 5, symbol: "XRPUSDT", period: "1h" },
        { id: 6, symbol: "XRPUSDT", period: "1h" },
        { id: 7, symbol: "BTCUSDT", period: "30m" },
        { id: 8, symbol: "XRPUSDT", period: "1h" },
        { id: 9, symbol: "XRPUSDT", period: "1h" },
    ];
}