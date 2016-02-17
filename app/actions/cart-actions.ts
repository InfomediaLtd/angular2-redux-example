import {Injectable} from "angular2/core";
import {Actions,AppStore} from "angular2-redux";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

@Injectable()
export class CartActions extends Actions {

    constructor(appStore:AppStore) {
      super(appStore);
    }

    addToCart(id) {
        return {type: ADD_TO_CART, id};
    };

    removeFromCart(id) {
        return {type: REMOVE_FROM_CART, id};
    };

}
