import {Component,OnDestroy} from '@angular/core'
import {AppStore} from "angular2-redux";
import {UserActions} from "../actions/user-actions";
import {UsersView} from "../views/admin/users-view";
import {UserView} from "../views/admin/user-view";
import {createSelector} from 'reselect';
import {usersListSelector,currentUserSelector,filterSelector} from "../reducers/users-reducer";
import {currentFilmSelector} from "../reducers/films-reducer";
import {Subscription} from "rxjs";

@Component({
    selector: 'admin',
    template: `
        <h3>Users</h3>
        <a href="" (click)="$event.preventDefault();setFilmFilter(!filmFilter)" [class.hidden]="!usersToShow">Turn filter {{filmFilter?"off":"on"}}</a>
        <users [data]="usersToShow" (current)="setCurrentUser($event)"></users>
        <hr/>
        <h3>Current User</h3>
        <br/>
        <user [data]="currentUser$ | async"></user>
    `,
    directives: [UsersView, UserView]
})
export class AdminComponent implements OnDestroy {

    private currentUser$ = null;

    private usersToShow = null;
    private filmFilter = null;

    private setCurrentUser;
    private setFilmFilter;

    private usersSubscription:Subscription;
    private filmFilterSubscription:Subscription;
    //private unsubscribeFromStore:()=>void;

    constructor(appStore:AppStore, userActions:UserActions) {

        this.setCurrentUser = userActions.createDispatcher(userActions.setCurrentUser);
        this.setFilmFilter  = userActions.createDispatcher(userActions.setFilmFilter);

        const usersToShowSelector = AdminComponent.createUsersToShowSelector();
        
        this.currentUser$ = appStore.select(currentUserSelector);

        this.usersSubscription = appStore.select(usersToShowSelector).subscribe(usersToShow => {
            this.usersToShow = usersToShow;
        });
        this.filmFilterSubscription = appStore.select(state=>state.users.filmFilter).subscribe(filmFilter => {
            this.filmFilter = filmFilter;
        })
        /*this.unsubscribeFromStore = appStore.subscribe((state) => {
            this.usersToShow = usersToShowSelector(state);
            this.filmFilter = state.users.filmFilter;
        });*/
        
        appStore.dispatch(userActions.fetchUsers());

    }

    private static createUsersToShowSelector() {
        const currentFilmWithFilterSelector = createSelector(filterSelector, currentFilmSelector,
            (filmFilter, currentFilm) => filmFilter && currentFilm ? currentFilm : null
        );
        return createSelector(usersListSelector, currentFilmWithFilterSelector,
            (users, currentFilm) => currentFilm ? users.filter(AdminComponent.getFilter(currentFilm)) : users
        );
    };

    private static getFilter(film) {
        const urlsInFilm = film.characters.reduce((urls, url) => Object.assign(urls, {[url]:true}) );
        return user => urlsInFilm[user.url];
    };

    public ngOnDestroy() {
        this.usersSubscription.unsubscribe();
        this.filmFilterSubscription.unsubscribe();
    }

}
