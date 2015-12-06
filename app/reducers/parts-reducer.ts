import partReducer from "./part-reducer"

export default (state = [], action:any = {}) => {
    switch (action.type) {
        case "ADD_PART":
            return [...state, partReducer(null, action)];
        default:
            return state;
    }
};