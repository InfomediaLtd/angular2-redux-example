import {PartActionTypes} from '../actions/part-actions';
import partReducer from "./part-reducer"

export default (state = [], action:any = {}) => {
    switch (action.type) {
        case PartActionTypes.ADD_PART:
            return [...state, partReducer(null, action)];
        default:
            return state;
    }
};
