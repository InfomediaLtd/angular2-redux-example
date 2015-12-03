import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../stores/app-store";
import {FilmSelectionView} from "../views/film-selection-view";
import {FilmActions} from "../actions/film-actions";
import {FilmView} from "../views/film-view";

@Component({
    selector: 'films-component',
    template: `
        <h3>Films</h3>
        <film-selection [count]="filmsCount" (current)="setCurrentFilm($event)"></film-selection>
        <div [ng-class]="{'text-muted':isFetchingCurrentFilm,'text-primary':!isFetchingCurrentFilm}" style="margin-left:10px;margin-top:20px;">
            <film [data]="currentFilm" [loading]="isFetchingCurrentFilm"></film>
        </div>

    `,
    directives: [CORE_DIRECTIVES, FilmSelectionView, FilmView]
})
export class FilmsComponent {

    private filmsCount=0;

    private currentFilm = null;
    private isFetchingCurrentFilm = false;

    constructor(private _appStore:AppStore,
                private _filmActions:FilmActions) {

        _appStore.subscribe(() => {
            var state = _appStore.getState();
            if (state.films.count && state.films.count!=this.filmsCount) {
                this.filmsCount = state.films.count;
            }
            this.currentFilm = state.films.currentFilm;
            this.isFetchingCurrentFilm = state.films.isFetchingFilm;

        });

        _appStore.dispatch(_filmActions.fetchFilms());
    }

    setCurrentFilm(index) {
        this._appStore.dispatch(this._filmActions.setCurrentFilm(index));
        this._appStore.dispatch(this._filmActions.fetchFilm(index ));
    }
}