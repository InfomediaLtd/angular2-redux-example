export const ADD_TO_CART:string = 'ADD_TO_CART';
export const REMOVE_FROM_CART:string = 'REMOVE_FROM_CART';

export function addToCart(id) {
    return {type:ADD_TO_CART,id};
}
export function removeFromCart(id) {
    return {type:REMOVE_FROM_CART,id};
}
