import {Http} from "@angular/http";
import {Injectable, Inject} from "@angular/core";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

const BASE_URL = "http://swapi.co/api/films/";

@Injectable()
export class FilmService {

    constructor(private _http:Http) {
    }

    get():Observable<any> {
        return this._http.get(`${BASE_URL}`)
                .map(result => result.json())
                .map(json => json.results);
    }
}