import * as UserActions from '../actions/user-actions';

export default (state = [], action:any = {}) => {
    switch(action.type) {
        case UserActions.REQUEST_USERS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case UserActions.RECEIVE_USERS:
            return Object.assign({}, state, {
                isFetching: false,
                list: action.users,
                updated: action.updated
            });
        default:
            return state;
    }
};
