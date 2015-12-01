import {Injectable} from "angular2/core";

export const ADD_PART:string = 'ADD_PART';

@Injectable()
export class PartActions {
    private id:number = 3;

    addPart(name) {
        return {type: ADD_PART, id: ++this.id, name};
    }
}
