import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { IUser } from "src/app/models/user";
import { IAppState } from "src/app/store";
import { DeleteView, GetViews } from "src/app/store/actions/view.actions";
import { getUser } from "src/app/store/selectors";
import { paginatedViews } from "src/app/store/selectors/views.selectors";

@Component({
    selector: 'app-views-list',
    templateUrl: './views-list.component.html',
    styleUrls: ['./views-list.component.css']
})
export class ViewsListComponent {
    views$ = this._store.select(paginatedViews);
    user$ = this._store.select(getUser);

    user!: IUser;

    constructor(private _store: Store<IAppState>) {
        this.user$.subscribe(user => {
            if (user) {
                this.user = user;
                this._store.dispatch(new GetViews(user.id));
            }
        })

    }

    deleteView(id: number) {
        this._store.dispatch(new DeleteView(id, this.user.id));
    }
}