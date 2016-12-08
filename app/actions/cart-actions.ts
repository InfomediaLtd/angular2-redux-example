import {Injectable} from "@angular/core";
import {Actions,AppStore} from "angular2-redux";

export enum CartActionTypes {
    ADD_TO_CART = "ADD_TO_CART" as any,
    REMOVE_FROM_CART = "REMOVE_FROM_CART" as any
};

export interface CartAction {
    type:string;
    id?:string;
}

@Injectable()
export class CartActions extends Actions {

    constructor(appStore:AppStore) {
      super(appStore);
    }

    addToCart(id) {
        return {type: CartActionTypes.ADD_TO_CART, id};
    };

    removeFromCart(id) {
        return {type: CartActionTypes.REMOVE_FROM_CART, id};
    };

}
