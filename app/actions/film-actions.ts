import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {Actions} from "./actions";

export const REQUEST_FILMS:string = 'REQUEST_FILMS';
export const RECEIVE_FILMS:string = 'RECEIVE_FILMS';
export const REQUEST_FILM:string = 'REQUEST_FILM';
export const RECEIVE_FILM:string = 'RECEIVE_FILM';
export const RECEIVE_NUMBER_OF_FILMS:string = 'RECEIVE_NUMBER_OF_FILMS';
export const CURRENT_FILM:string = 'CURRENT_FILM';

@Injectable()
export class FilmActions extends Actions {

    BASE_URL:string = "http://swapi.co/api/films/";

    constructor(private _http:Http) {
        super();
    }

    fetchFilms() {
        return (dispatch) => {
            dispatch(this.requestFilms());

            this._http.get(`${this.BASE_URL}`)
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

            this._http.get(`${this.BASE_URL}${index + 1}/`)
                .map(result => result.json())
                .map(json => {
                    dispatch(this.receiveFilm(json));
                })
                .subscribe();
        };
    }

    requestFilms() {
        return {type: REQUEST_FILMS};
    }

    receiveFilms(films) {
        return {
            type: RECEIVE_FILMS,
            films
        }
    }

    receiveNumberOfFilms(count) {
        return {
            type: RECEIVE_NUMBER_OF_FILMS,
            count
        }
    }

    requestFilm() {
        return {type: REQUEST_FILM};
    }

    receiveFilm(film) {
        return {
            type: RECEIVE_FILM,
            film
        }
    }

    setCurrentFilm(currentIndex) {
        return {
            type: CURRENT_FILM,
            currentIndex
        }
    }
}



