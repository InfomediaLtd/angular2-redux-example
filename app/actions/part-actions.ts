var id = 0;
export function addPart(name) {
    return {type: "ADD_PART", id: id++, name};
};