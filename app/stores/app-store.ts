import {Injectable} from "angular2/core";

/**
 * Wrapper for app store
 */
@Injectable()
export class AppStore {

    public getState  :()=>any;
    public subscribe :(subscribeFunction:(state)=>any)=>()=>any;
    public dispatch  :(action)=>any;

    constructor(store:any) {
        this.getState = () => {
            return store.getState();
        };
        this.subscribe = (subscribeFunction:(state)=>any) => {
            // decorate the subscription with the state passed in as a parameter
            return store.subscribe(() => subscribeFunction(this.getState()));
        };
        this.dispatch = (action) => {
            return store.dispatch(action);
        };
    }


}
