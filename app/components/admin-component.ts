import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../stores/app-store";

import {UserActions} from "../actions/user-actions";

import {UsersView} from "../views/users-view";
import {UserView} from "../views/user-view";

@Component({
    selector: 'admin',
    template: `
        <h3>Users</h3>
        <users
            [users]="users"
            (current)="setCurrentUser123($event)">
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
    private currentUser = null;

    constructor(private _appStore:AppStore,
                private _userActions:UserActions) {

        _appStore.subscribe(() => {
            var state = _appStore.getState();

            this.users = state.users;
            this.currentUser = state.users.current;

        });

        _appStore.dispatch(_userActions.fetchUsers());


    }

    setCurrentUser123(id) {
        this._appStore.dispatch(this._userActions.setCurrentUser(id))
    }

}