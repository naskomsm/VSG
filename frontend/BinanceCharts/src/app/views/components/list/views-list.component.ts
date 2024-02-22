import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { IView } from "src/app/models/view";
import { IAppState } from "src/app/store";
import { GetViews } from "src/app/store/actions/view.actions";
import { paginatedViews } from "src/app/store/selectors/views.selectors";

@Component({
    selector: 'app-views-list',
    templateUrl: './views-list.component.html',
    styleUrls: ['./views-list.component.css']
})
export class ViewsListComponent {
    views$ = this._store.select(paginatedViews);

    constructor(private _store: Store<IAppState>) {
        this._store.dispatch(new GetViews());
    }
}