import {PartActionTypes} from '../actions/part-actions';

export default (state:any = {}, action:any = {}) => {
    switch (action.type) {
        case PartActionTypes.ADD_PART:
            return {id: action.id, name: action.name};
        default:
            return state;
    }
};
