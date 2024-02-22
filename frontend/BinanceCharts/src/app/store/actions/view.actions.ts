import { Action } from "@ngrx/store";
import { Paginated } from "src/app/models/paginated";
import { IView } from "src/app/models/view";

export enum EViewsActions {
    GetViews = '[Views] Get Views attempt',
    GetViewsSuccess = '[Views] Get Views success',
    GetViewsFailure = '[Views] Get Views failure',
}

export class GetViews implements Action {
    public readonly type = EViewsActions.GetViews;
    constructor(public page: number = 1, public perPage: number = 10) { }
}

export class GetViewsSuccess implements Action {
    public readonly type = EViewsActions.GetViewsSuccess;
    constructor(public views: Paginated<IView>) { }
}

export class GetViewsFailure implements Action {
    public readonly type = EViewsActions.GetViewsFailure;
    constructor() { }
}

export type ViewActions =
    | GetViews
    | GetViewsSuccess
    | GetViewsFailure;