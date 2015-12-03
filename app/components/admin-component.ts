import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../stores/app-store";

import {UserActions} from "../actions/user-actions";

import {UsersView} from "../views/users-view";
import {UserView} from "../views/user-view";

@Component({
    selector: 'admin',
    template: `
        <h3>Users</h3>
        <a href="" (click)="toggleFilter($event)" [class.hide]="!currentFilm || filmFilter">Turn filter on</a>
        <a href="" (click)="toggleFilter($event)" [class.hide]="!currentFilm || !filmFilter">Turn filter off</a>
        <users
            [data]="usersToShow"
            (current)="setCurrentUser($event)">
        </users>
        <hr/>
        <h3>Current User</h3>
        <br/>
        <user [data]="currentUser"></user>
    `,
    directives: [CORE_DIRECTIVES, UsersView, UserView]
})
export class AdminComponent {

    private users = [];
    private usersToShow = [];
    private currentUser = null;
    private currentFilm = null;
    private filmFilter = null;

    constructor(private _appStore:AppStore,
                private _userActions:UserActions) {

        _appStore.subscribe(() => {
            var state = _appStore.getState();

            if (this.users !== state.users.list ||
                this.filmFilter != state.users.filmFilter ||
                this.currentFilm !== state.films.currentFilm) {

                this.usersToShow = this.filterUsers(state.users.filmFilter, state.users.list, state.films.currentFilm);
            }

            this.users = state.users.list;
            this.currentUser = state.users.current;
            this.currentFilm = state.films.currentFilm;
            this.filmFilter = state.users.filmFilter;

        });

        this.filmFilter = _appStore.getState().users.filmFilter;
        _appStore.dispatch(_userActions.fetchUsers());


    }

    private setCurrentUser(id) {
        this._appStore.dispatch(this._userActions.setCurrentUser(id))
    }
    private toggleFilter($event) {
        this._appStore.dispatch(this._userActions.setFilmFilter(!this.filmFilter));
        $event.preventDefault();
    }

    private filterUsers(filmFilter, users, currentFilm) {
        if (filmFilter && currentFilm) {
            const idsMap = currentFilm.characters
                .map(character => AdminComponent.getId(character))
                .reduce((idsMap,id)=>{
                    idsMap[id]=true;
                    return idsMap;
                },{});
            return users.filter(user => idsMap[AdminComponent.getId(user.url)]);
        } else {
            return users;
        }
    }

    private static getId(url) {
        return url.replace(/[a-z\/\.\:]*/g, "");
    };

}