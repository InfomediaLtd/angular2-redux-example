import {Injectable} from "@angular/core";
import {Actions,AppStore} from "angular2-redux";

export const ADD_PART = 'ADD_PART';

type Types = "ADD_PART";
export const PartActionTypes = {
    ADD_PART: "ADD_PART" as Types
};

export interface PartAction {
    type:String;
    id?:number;
    name?:string;
}

@Injectable()
export class PartActions extends Actions {
    private id:number = 11;

    constructor(appStore:AppStore) {
      super(appStore);
    }

    addPart(name) {
        return {type: PartActionTypes.ADD_PART, id: ++this.id, name};
    }
}
