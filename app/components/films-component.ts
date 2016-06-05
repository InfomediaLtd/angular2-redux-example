import {Component} from '@angular/core'
import {AppStore} from "angular2-redux";
import {FilmActions} from "../actions/film-actions";
import {FilmSelectionView} from "../views/film/film-selection-view";
import {FilmView} from "../views/film/film-view";
import {currentFilmSelector,filmsCountSelector,isFetchingFilmSelector} from "../reducers/films-reducer";

@Component({
    selector: 'films-component',
    template: `
        <h3>Films</h3>
        <film-selection [count]="filmsCount$ | async" (current)="setCurrentFilm($event)"></film-selection>
        <div [ngClass]="{'text-muted':isFetchingCurrentFilm,'text-primary':!isFetchingCurrentFilm}" style="margin-top:20px;">
            <film [data]="currentFilm$ | async" [loading]="isFetchingCurrentFilm"></film>
        </div>

    `,
    directives: [FilmSelectionView, FilmView]
})
export class FilmsComponent {

    private filmsCount$;
    private currentFilm$ = null;
    private isFetchingCurrentFilm = false;

    private unsubscribeFromStore:()=>void;

    constructor(private _appStore:AppStore,
                private _filmActions:FilmActions) {

        this.filmsCount$ = _appStore.select(filmsCountSelector);
        this.currentFilm$ = _appStore.select(currentFilmSelector);

        _appStore.select(isFetchingFilmSelector).subscribe(isFetchingFilm => {
            this.isFetchingCurrentFilm = isFetchingFilm;
        });
        
        _appStore.dispatch(_filmActions.fetchFilms());
    }

    setCurrentFilm(index) {
        this._appStore.dispatch(this._filmActions.setCurrentFilm(index));
        this._appStore.dispatch(this._filmActions.fetchFilm(index ));
    }

}
