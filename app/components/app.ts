import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../stores/app-store";
import {PartsView} from "../views/parts";
import {CartView} from "../views/cart";
import {UsersView} from "../views/users";

import {CartActions} from "../actions/cart-actions";
import {UserActions} from "../actions/user-actions";
import {PartActions} from "../actions/part-actions";

import { bindActionCreators } from "redux";

@Component({
    selector: 'my-app',
    template: `
        <h3>Parts</h3>
        <parts
            [parts]="parts"
            [unavailable]="partIdsInCart"
            (add-to-cart)="addPartToCart($event)">
        </parts>
        <hr/>
        <h3>Ordered Parts</h3>
        <cart
            [parts]="partsInCart"
            (remove-from-cart)="removePartFromCart($event)">
        </cart>
        <hr/>
        <h3>Users</h3>
        <users [users]="users"></users>
    `,
    directives: [CORE_DIRECTIVES, PartsView, CartView, UsersView]
})
export class AppView {

    private parts = [];
    private partIdsInCart = [];
    private cart = [];
    private partsInCart = [];
    private users = [];

    constructor(
        private _appStore:AppStore,
        private _partActions:PartActions,
        private _cartActions:CartActions,
        private _userActions:UserActions) {

        _appStore.subscribe(() => {

            // parts
            this.parts = _appStore.getState().parts;

            // cart
            if (this.cart !== _appStore.getState().cart) {
                var partsById = _appStore.getState().parts.reduce((map, part) => {
                    map[part.id] = part;
                    return map;
                }, {});
                this.partsInCart = _appStore.getState().cart.reduce((partsInCart, id) => {
                    partsInCart.push(partsById[id]);
                    return partsInCart;
                }, []);
                this.partIdsInCart = _appStore.getState().cart.reduce((map, id) => {
                    map[id] = true;
                    return map;
                }, {});
            }

            // users
            this.users = _appStore.getState().users;


        });

        _appStore.dispatch(_userActions.fetchUsers());

        // add initial parts
        _appStore.dispatch(this._partActions.addPart("Bumper"));
        _appStore.dispatch(this._partActions.addPart("MP3 Player"));
        _appStore.dispatch(this._partActions.addPart("Mirror"));
        _appStore.dispatch(this._partActions.addPart("Hood"));

    }

    addPartToCart(id) {
        this._appStore.dispatch(this._cartActions.addToCart(id));
    }
    removePartFromCart(id) {
        this._appStore.dispatch(this._cartActions.removeFromCart(id))
    }

}