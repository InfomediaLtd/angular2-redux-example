import {Component} from 'angular2/core'
import {AppStore} from "angular2-redux";
import {UserActions} from "../actions/user-actions";
import {UsersView} from "../views/admin/users-view";
import {UserView} from "../views/admin/user-view";
import {createSelector} from 'rackt/reselect';

@Component({
    selector: 'admin',
    providers: [UserActions],
    directives: [UsersView, UserView],
    template: `
        <h3>Users</h3>
        <users [data]="usersToShow" (current)="setCurrentUser($event)"></users>
        <hr/>
        <h3>Current User</h3>
        <br/>
        <user [data]="currentUser"></user>
    `
})
export class AdminComponent {

    private usersToShow = null;
    private currentUser = null;
    private filmFilter = null;

    private setCurrentUser;

    constructor(appStore:AppStore, userActions:UserActions) {

        this.setCurrentUser = userActions.createDispatcher(appStore, userActions.setCurrentUser);

        appStore.subscribe((state) => {
            this.usersToShow = state.users.list;
            this.currentUser = state.users.current;
        });

        appStore.dispatch(userActions.fetchUsers());

    }

}
