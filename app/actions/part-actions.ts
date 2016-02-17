import {Injectable} from "angular2/core";
import {Actions,AppStore} from "angular2-redux";

export const ADD_PART = 'ADD_PART';

@Injectable()
export class PartActions extends Actions {
    private id:number = 11;

    constructor(appStore:AppStore) {
      super(appStore);
    }
    
    addPart(name) {
        return {type: ADD_PART, id: ++this.id, name};
    }
}
