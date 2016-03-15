import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {Actions,AppStore} from "angular2-redux";
import 'rxjs/add/operator/map';

const BASE_URL = "http://swapi.co/api/films/";

type Types = "REQUEST_FILMS" | "RECEIVE_FILMS" |
             "REQUEST_FILM" | "RECEIVE_FILM" |
             "RECEIVE_NUMBER_OF_FILMS" | "CURRENT_FILM";
export const FilmActionTypes = {
    REQUEST_FILMS: "REQUEST_FILMS" as Types,
    RECEIVE_FILMS: "RECEIVE_FILMS" as Types,
    REQUEST_FILM: "REQUEST_FILM" as Types,
    RECEIVE_FILM: "RECEIVE_FILM" as Types,
    RECEIVE_NUMBER_OF_FILMS: "RECEIVE_NUMBER_OF_FILMS" as Types,
    CURRENT_FILM: "CURRENT_FILM" as Types
};

@Injectable()
export class FilmActions extends Actions {

    constructor(private _http:Http, appStore:AppStore) {
        super(appStore);
    }

    fetchFilms() {
        return (dispatch) => {
            dispatch(this.requestFilms());

            this._http.get(`${BASE_URL}`)
                .map(result => result.json())
                .map(json => {
                    dispatch(this.receiveFilms(json.results));
                    dispatch(this.receiveNumberOfFilms(json.count));
                })
                .subscribe();
        };
    }

    fetchFilm(index) {
        return (dispatch) => {
            dispatch(this.requestFilm());

            this._http.get(`${BASE_URL}${index + 1}/`)
                .map(result => result.json())
                .map(json => {
                    dispatch(this.receiveFilm(json));
                })
                .subscribe();
        };
    }

    requestFilms() {
        return {type: FilmActionTypes.REQUEST_FILMS};
    }

    receiveFilms(films) {
        return {
            type: FilmActionTypes.RECEIVE_FILMS,
            films
        }
    }

    receiveNumberOfFilms(count) {
        return {
            type: FilmActionTypes.RECEIVE_NUMBER_OF_FILMS,
            count
        }
    }

    requestFilm() {
        return {type: FilmActionTypes.REQUEST_FILM};
    }

    receiveFilm(film) {
        return {
            type: FilmActionTypes.RECEIVE_FILM,
            film
        }
    }

    setCurrentFilm(currentIndex) {
        return {
            type: FilmActionTypes.CURRENT_FILM,
            currentIndex
        }
    }
}
