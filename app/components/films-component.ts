import {Component,OnDestroy} from '@angular/core'
import {AppStore} from "angular2-redux";
import {FilmActions} from "../actions/film-actions";
import {FilmSelectionView} from "../views/film/film-selection-view";
import {FilmView} from "../views/film/film-view";

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
export class FilmsComponent implements OnDestroy {

    private filmsCount$;
    private currentFilm$ = null;
    private isFetchingCurrentFilm = false;

    private unsubscribeFromStore:()=>void;

    constructor(private _appStore:AppStore,
                private _filmActions:FilmActions) {

        this.filmsCount$ = _appStore.select(state => state.films.count);
        this.currentFilm$ = _appStore.select(state => state.films.currentFilm);

        this.unsubscribeFromStore = _appStore.subscribe((state) => {
            this.isFetchingCurrentFilm = state.films.isFetchingFilm;

        });

        _appStore.dispatch(_filmActions.fetchFilms());
    }

    setCurrentFilm(index) {
        this._appStore.dispatch(this._filmActions.setCurrentFilm(index));
        this._appStore.dispatch(this._filmActions.fetchFilm(index ));
    }

    public ngOnDestroy() { this.unsubscribeFromStore(); }

}
