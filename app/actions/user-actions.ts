import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {Actions,AppStore} from "angular2-redux";
import 'rxjs/add/operator/map';

type Types = "REQUEST_USERS" | "RECEIVE_USERS" | "CURRENT_USER" | "SET_FILM_FILTER";
export const UserActionTypes = {
    REQUEST_USERS: "REQUEST_USERS" as Types,
    RECEIVE_USERS: "RECEIVE_USERS" as Types,
    CURRENT_USER: "CURRENT_USER" as Types,
    SET_FILM_FILTER: "SET_FILM_FILTER" as Types
};

@Injectable()
export class UserActions extends Actions {

  constructor(private _http:Http, appStore:AppStore) {
      super(appStore);
  }

    fetchUsers() {
        const BASE_URL:string = "http://swapi.co/api/people/";
        return (dispatch) => {
            dispatch(this.requestUsers());

            this._http.get(`${BASE_URL}`)
                .map(result => result.json())
                .map(json => json.results)
                .map(result =>  dispatch(this.receiveUsers(result)))
                .subscribe();
        };
    }

    requestUsers() {
        return {type: UserActionTypes.REQUEST_USERS};
    }

    receiveUsers(users) {
        return {
            type: UserActionTypes.RECEIVE_USERS,
            users,
            updated: Date.now()
        }
    }

    setCurrentUser(current) {
        return {
            type: UserActionTypes.CURRENT_USER,
            current
        }
    }

    setFilmFilter(filmFilter) {
        return {
            type: UserActionTypes.SET_FILM_FILTER,
            filmFilter: filmFilter
        }
    }
}
