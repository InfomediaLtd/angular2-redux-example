export default (state = [], action:any = {}) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return [
                ...state,
                action.id
            ];
        case "REMOVE_FROM_CART":
            return state.filter((id) => (id!==action.id));
        default:
            return state;
    }
};
