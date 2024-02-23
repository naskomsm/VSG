import { Paginated } from "src/app/models/paginated";
import { IView } from "src/app/models/view";

export interface IViewsState {
    views?: Paginated<IView>;
}

export const initialViewsState: IViewsState = {}