import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../app-store";
import {removeFromCart} from "../actions/cart-actions";

@Component({
    selector: 'cart',
    template: `
        <table>
            <tr *ng-for="#part of parts">
                <td><button href="" (click)="removePartFromCart(part)">remove</button></td>
                <td>{{part.name}}</td>
            </tr>
        </table>
    `,
    directives: [CORE_DIRECTIVES]
})
export class CartView {
    cart = [];
    parts = [];

    constructor(private appStore:AppStore) {
        appStore.subscribe(() => {
            if (this.cart !== appStore.getState().cart) {
                this.cart = appStore.getState().cart;

                var partsById = appStore.getState().parts.reduce((map, part) => {
                    map[part.id]=part;
                    return map;
                },{});
                this.parts = this.cart.reduce((parts, id) => {
                    parts.push(partsById[id]);
                    return parts;
                },[]);
            }
        });
    }

    removePartFromCart(part) {
        this.appStore.dispatch(removeFromCart(part.id))
    }

}