import {Injectable} from "angular2/core";

export const ADD_TO_CART:string = 'ADD_TO_CART';
export const REMOVE_FROM_CART:string = 'REMOVE_FROM_CART';

@Injectable()
export class CartActions {

    addToCart(id) {
        return {type:ADD_TO_CART,id};
    };

    removeFromCart(id) {
        return {type:REMOVE_FROM_CART,id};
    };

}

