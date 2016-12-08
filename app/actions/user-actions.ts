import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Actions,AppStore} from "angular2-redux";
import {UserService} from "../services/user.service";
import 'rxjs/add/operator/map';

export enum UserActionTypes {
    REQUEST_USERS = "REQUEST_USERS" as any,
    RECEIVE_USERS = "RECEIVE_USERS" as any,
    CURRENT_USER = "CURRENT_USER" as any,
    SET_FILM_FILTER = "SET_FILM_FILTER" as any
};

export interface UserAction {
    type:string;
    users?;
    updated?:Date;
    current?;
    filmFilter?:string;
} 

@Injectable()
export class UserActions extends Actions {

  constructor(private userService:UserService, appStore:AppStore) {
      super(appStore);
  }

    fetchUsers() {
        return (dispatch) => {
            dispatch(this.requestUsers());
            this.userService.get()
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
