import {Http} from "angular2/http";
import {Injectable} from "angular2/core";

export const REQUEST_USERS:string = 'REQUEST_USERS';
export const RECEIVE_USERS:string = 'RECEIVE_USERS';

@Injectable()
export class UserActions {

    constructor(private _http:Http) {
    }

    fetchUsers() {
        const BASE_URL:string = "http://jsonplaceholder.typicode.com/users";
        const _http = this._http;
        return function (dispatch) {
            dispatch(requestUsers());

            _http.get(`${BASE_URL}`)
                .map(result => result.json())
                .map(json => {
                    dispatch(receiveUsers(json));
                }).subscribe();
        }
    }

}


export var requestUsers = () => {
    return {type: REQUEST_USERS};
};
export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
        updated: Date.now()
    }
}
