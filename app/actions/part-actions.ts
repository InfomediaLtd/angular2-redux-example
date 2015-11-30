export const ADD_PART:string = 'ADD_PART';

var id = 0;
export function addPart(name) {
    return {type: ADD_PART, id: id++, name};
}