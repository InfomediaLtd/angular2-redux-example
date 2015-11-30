import {Injectable} from "angular2/core";

@Injectable()
export class AppStore {

    public store:any;

    constructor(store:any) {
        this.store = store;
    }

    getState() {
        return this.store.getState();
    }
    subscribe(subscribeFunction) {
        return this.store.subscribe(subscribeFunction);
    }
    dispatch(action) {
        return this.store.dispatch(action);
    }
}
