import {Component, CORE_DIRECTIVES, Input, Output, EventEmitter} from 'angular2/angular2'

import {AppStore} from "../app-store";
import {UserActions} from "../actions/user-actions";

@Component({
    selector: 'users',
    template: `
        <table>
            <tr *ng-for="#user of users">
                <td>{{user.name}}</td>
            </tr>
        </table>
    `,
    directives: [CORE_DIRECTIVES]
})
export class UsersView {
    @Input() users = [];


    constructor(appStore:AppStore, userActions:UserActions) {
        appStore.subscribe(() => {
            this.users = appStore.getState().users.list;
        });

        appStore.dispatch(userActions.fetchUsers());
    }
}