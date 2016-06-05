const partsByIdReducer = (partsById, part) => Object.assign(partsById, {[part.id]:part});

export const partsSelector = state => state.parts
export const partsByIdSelector = state => state.parts.reduce(partsByIdReducer, {});    
