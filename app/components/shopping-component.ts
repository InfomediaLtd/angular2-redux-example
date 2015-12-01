import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../stores/app-store";

import {CartActions} from "../actions/cart-actions";
import {PartActions} from "../actions/part-actions";

import {PartsView} from "../views/parts-view";
import {CartView} from "../views/cart-view";

@Component({
    selector: 'shopping',
    template: `
        <h3>Parts</h3>
        <parts
            [parts]="parts"
            [unavailable]="partIdsInCart"
            (add-to-cart)="addPartToCart($event)">
        </parts>
        <hr/>
        <h3>Cart</h3>
        <cart
            [parts]="partsInCart"
            (remove-from-cart)="removePartFromCart($event)">
        </cart>
    `,
    directives: [CORE_DIRECTIVES, PartsView, CartView]
})
export class ShoppingComponent {

    private parts = [];
    private cart = [];
    private partIdsInCart = {};
    private partsInCart = [];

    constructor(private _appStore:AppStore,
                private _partActions:PartActions,
                private _cartActions:CartActions) {

        _appStore.subscribe(() => {
            var state = _appStore.getState();

            this.parts = state.parts;
            if (this.cart !== state.cart) {
                this.setCartProperties(_appStore);
            }
        });

        this.createInitialSetOfParts(_appStore);

    }

    private createInitialSetOfParts(_appStore) {
        _appStore.dispatch(this._partActions.addPart("Bumper"));
        _appStore.dispatch(this._partActions.addPart("MP3 Player"));
        _appStore.dispatch(this._partActions.addPart("Mirror"));
        _appStore.dispatch(this._partActions.addPart("Hood"));
    };

    private setCartProperties(_appStore) {
        var partsById = _appStore.getState().parts.reduce((map, part) => {
            map[part.id] = part;
            return map;
        }, {});
        var computed = _appStore.getState().cart.reduce(({partsInCart,partIdsInCart}, id) => {
            partsInCart.push(partsById[id]);
            partIdsInCart[id] = true;
            return {partsInCart, partIdsInCart};
        }, {partsInCart: [], partIdsInCart: {}});
        this.partsInCart = computed.partsInCart;
        this.partIdsInCart = computed.partIdsInCart;

        this.cart = _appStore.getState().cart;
    };

    addPartToCart(id) {
        this._appStore.dispatch(this._cartActions.addToCart(id));
    }

    removePartFromCart(id) {
        this._appStore.dispatch(this._cartActions.removeFromCart(id))
    }

}