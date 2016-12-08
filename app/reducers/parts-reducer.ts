import {PartActionTypes,PartAction} from '../actions/part-actions';
import partReducer from "./part-reducer"

export default (state = [], action:PartAction = {type:"?"}) => {
    switch (action.type) {
        case PartActionTypes.ADD_PART:
            return [...state, partReducer(null, action)];
        default:
            return state;
    }
};


const partsByIdReducer = (partsById, part) => ({...partsById, [part.id]:part});

export const partsSelector = state => state.parts
export const partsByIdSelector = state => state.parts.reduce(partsByIdReducer, {});    
