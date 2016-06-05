import {UserActionTypes,UserAction} from '../actions/user-actions';

export default (state = {}, action:UserAction = {type:"?"}) => {
    switch (action.type) {
        case UserActionTypes.REQUEST_USERS:
            return Object.assign({}, state, {isFetching: true});
        case UserActionTypes.RECEIVE_USERS:
            return Object.assign({}, state, {isFetching: false, list: action.users, updated: action.updated});
        case UserActionTypes.CURRENT_USER:
            return Object.assign({}, state, {current: action.current});
        case UserActionTypes.SET_FILM_FILTER:
            return Object.assign({}, state, {filmFilter: action.filmFilter});
        default:
            return state;
    }
};

export const currentUserSelector = state => state.users.current
export const filterSelector = state => state.users.filmFilter
export const usersListSelector = state => state.users.list
