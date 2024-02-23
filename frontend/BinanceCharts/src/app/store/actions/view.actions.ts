import { Action } from "@ngrx/store";
import { IMessage } from "src/app/models/message";
import { Paginated } from "src/app/models/paginated";
import { ISaveView, IView } from "src/app/models/view";

export enum EViewsActions {
    GetViews = '[Views] Get Views attempt',
    GetViewsSuccess = '[Views] Get Views success',
    GetViewsFailure = '[Views] Get Views failure',
    DeleteView = '[Views] Delete view attempt',
    DeleteViewSuccess = '[Views] Delete view success',
    DeleteViewFailure = '[Views] Delete view failure',
    SaveView = '[Views] Save view',
    SaveViewSucsess = '[Views] Save view success',
    SaveViewFailure = '[Views] Save view failure'
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

export class DeleteView implements Action {
    public readonly type = EViewsActions.DeleteView;
    constructor(public id: number) { }
}

export class DeleteViewSuccess implements Action {
    public readonly type = EViewsActions.DeleteViewSuccess;
    constructor(public message: IMessage) { }
}

export class DeleteViewFailure implements Action {
    public readonly type = EViewsActions.DeleteViewFailure;
    constructor() { }
}

export class SaveView implements Action {
    public readonly type = EViewsActions.SaveView;
    constructor(public view: ISaveView) { }
}

export class SaveViewSuccess implements Action {
    public readonly type = EViewsActions.SaveViewSucsess;
    constructor(public view: IView) { }
}

export class SaveViewFailure implements Action {
    public readonly type = EViewsActions.SaveViewFailure;
    constructor() { }
}

export type ViewActions =
    | GetViews
    | GetViewsSuccess
    | GetViewsFailure
    | DeleteView
    | DeleteViewSuccess
    | DeleteViewFailure
    | SaveView
    | SaveViewSuccess
    | SaveViewFailure;