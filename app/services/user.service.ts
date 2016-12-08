import {Http} from "@angular/http";
import {Injectable, Inject} from "@angular/core";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

const BASE_URL:string = "http://swapi.co/api/people/";

@Injectable()
export class UserService {

    constructor(private _http:Http) {
    }

    get():Observable<any> {
        return this._http.get(`${BASE_URL}`)
                .map(result => result.json())
                .map(json => json.results);
    }
}