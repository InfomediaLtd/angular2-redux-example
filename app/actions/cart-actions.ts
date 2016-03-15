import {Injectable} from "angular2/core";
import {Actions,AppStore} from "angular2-redux";

type Types = "ADD_TO_CART" | "REMOVE_FROM_CART";
export const CartActionTypes = {
    ADD_TO_CART: "ADD_TO_CART" as Types,
    REMOVE_FROM_CART: "REMOVE_FROM_CART" as Types
};

@Injectable()
export class CartActions extends Actions {

    constructor(appStore:AppStore) {
      super(appStore);
    }

    addToCart(id) {
        let action = {type: CartActionTypes.ADD_TO_CART, id};
        let json = JSON.stringify(action);
        action = JSON.parse(json);
        return action;
    };

    removeFromCart(id) {
        return {type: CartActionTypes.REMOVE_FROM_CART, id};
    };

}
