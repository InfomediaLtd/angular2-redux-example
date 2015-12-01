import {Component, CORE_DIRECTIVES, Input, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/angular2'

import {AppStore} from "../stores/app-store";
import {removeFromCart} from "../actions/cart-actions";

@Component({
    selector: 'cart',
    template: `
        <table>
            <tr *ng-for="#part of parts">
                <td>
                    <button style="margin-right:10px"
                        (click)="removeFromCart.next(part.id)">remove
                    </button>
                </td>
                <td>{{part.name}}</td>
            </tr>
        </table>
    `,
    directives: [CORE_DIRECTIVES],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartView {
    cart = [];
    @Input() parts = [];
    @Output() removeFromCart: EventEmitter = new EventEmitter();

    /*constructor(private appStore:AppStore) {
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
    }*/



}