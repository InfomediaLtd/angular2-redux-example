import {Http} from "angular2/http";
import {Injectable} from "angular2/core";

export const REQUEST_USERS:string = 'REQUEST_USERS';
export const RECEIVE_USERS:string = 'RECEIVE_USERS';
export const CURRENT_USER:string = 'CURRENT_USER';

@Injectable()
export class UserActions {

    constructor(private _http:Http) {
    }

    fetchUsers() {
        const BASE_URL:string = "http://jsonplaceholder.typicode.com/users";
        return (dispatch) => {
            dispatch(this.requestUsers());

            this._http.get(`${BASE_URL}`)
                .map(result => result.json())
                .map(json => {
                    dispatch(this.receiveUsers(json));
                }).subscribe();
        };
    }

    requestUsers() {
        return {type: REQUEST_USERS};
    }

    receiveUsers(users) {
        return {
            type: RECEIVE_USERS,
            users,
            updated: Date.now()
        }
    }

    setCurrentUser(current) {
        return {
            type: CURRENT_USER,
            current
        }
    }
}



