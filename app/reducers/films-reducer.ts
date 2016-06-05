import {FilmActionTypes,FilmAction} from '../actions/film-actions';

export default (state = [], action:FilmAction = {type:"?"}) => {
    switch (action.type) {
        case FilmActionTypes.REQUEST_FILMS:
            return Object.assign({}, state, {isFetchingFilms: true});
        case FilmActionTypes.RECEIVE_FILMS:
            return Object.assign({}, state, {isFetchingFilms: false, list: action.films});
        case FilmActionTypes.REQUEST_FILM:
            return Object.assign({}, state, {isFetchingFilm: true});
        case FilmActionTypes.RECEIVE_FILM:
            return Object.assign({}, state, {isFetchingFilm: false, currentFilm: action.film});
        case FilmActionTypes.RECEIVE_NUMBER_OF_FILMS:
            return Object.assign({}, state, {count: action.count});
        case FilmActionTypes.CURRENT_FILM:
            return Object.assign({}, state, {current: action.currentIndex});
        default:
            return state;
    }
};

export const currentFilmSelector = state => state.films.currentFilm
export const filmsCountSelector = state => state.films.count
export const isFetchingFilmSelector = state => state.films.isFetchingFilm

