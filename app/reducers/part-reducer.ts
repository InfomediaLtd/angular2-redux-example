export default (state:any = {}, action:any = {}) => {
    switch(action.type) {
        case "ADD_PART":
            return {id: action.id, name: action.name};
        default:
            return state;
    }
};