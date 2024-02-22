import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "src/app/models/user";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(private httpClient: HttpClient) { }

    signin(username: string) {
        return this.httpClient.post<IUser>(
            `${environment.api}/api/User/signin`, { username }
        )
    }
}
