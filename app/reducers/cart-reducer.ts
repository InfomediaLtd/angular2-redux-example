import {CartActionTypes} from '../actions/cart-actions';

export default (state = [], action:any = {}) => {

    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            return [...state, action.id];
        case CartActionTypes.REMOVE_FROM_CART:
            return state.filter(id => id !== action.id);
        default:
            return state;
    }
};
