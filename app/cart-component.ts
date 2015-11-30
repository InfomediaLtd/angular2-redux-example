import {Component, CORE_DIRECTIVES} from 'angular2/angular2'
import {bind, Injector} from 'angular2/core';
import {AppStore} from "./app-store";

@Component({
    selector: 'cart',
    template: `
        <h3>Ordered parts</h3>
        <table>
            <tr *ng-for="#part of parts">
                <td><button href="" (click)="addPartToCart(part)">add</button></td>
                <td>{{part.name}}</td>
            </tr>
        </table>
    `,
    directives: [CORE_DIRECTIVES]
})
export class CartComponent {
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

    addPartToCart(part) {
        this.appStore.dispatch({type:"ADD_TO_CART",id:part.id})
    }

}