import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Actions,AppStore} from "angular2-redux";
import {FilmService} from "../services/film.service";
import 'rxjs/add/operator/map';

export enum FilmActionTypes {
    REQUEST_FILMS = "REQUEST_FILMS" as any,
    RECEIVE_FILMS = "RECEIVE_FILMS" as any,
    REQUEST_FILM = "REQUEST_FILM" as any,
    RECEIVE_FILM = "RECEIVE_FILM" as any,
    RECEIVE_NUMBER_OF_FILMS = "RECEIVE_NUMBER_OF_FILMS" as any,
    CURRENT_FILM = "CURRENT_FILM" as any
};

export interface FilmAction {
    type:string;
    count?;
    films?;
    film?;
    currentIndex?;
}

@Injectable()
export class FilmActions extends Actions {

    constructor(private filmService:FilmService, appStore:AppStore) {
        super(appStore);
    }

    fetchFilms() {
        return (dispatch) => {
            dispatch(this.requestFilms());

            this.filmService.get()
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
