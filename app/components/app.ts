import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../app-store";
import {PartsView} from "./parts";
import {CartView} from "./cart";
import {UsersView} from "./users";

import * as CartActions from "../actions/cart-actions";

@Component({
    selector: 'my-app',
    template: `
        <h3>Parts</h3>
        <parts
            [parts]="parts"
            [unavailable]="inCart"
            (add-to-cart)="addPartToCart($event)">
        </parts>
        <hr/>
        <h3>Ordered Parts</h3>
        <cart></cart>
        <hr/>
        <h3>Users</h3>
        <users></users>
    `,
    directives: [CORE_DIRECTIVES, PartsView, CartView, UsersView]
})
export class AppView {

    private parts = [];
    private inCart = [];

    constructor(private _appStore:AppStore) {

        const setParts = () => {
            this.parts = _appStore.getState().parts;
            this.inCart = _appStore.getState().cart.reduce((map, id) => {
                map[id] = true;
                return map;
            }, {});
        };

        _appStore.subscribe(setParts);
        // initial set of parts
        setParts();

    }

    addPartToCart(id) {
        this._appStore.dispatch(CartActions.addToCart(id));
    }

}