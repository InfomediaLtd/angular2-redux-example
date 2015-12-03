import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../stores/app-store";
import {CartActions} from "../actions/cart-actions";
import {PartActions} from "../actions/part-actions";

import {PartsView} from "../views/catalog/parts-view";
import {CartView} from "../views/catalog/cart-view";
import {AddPartsView} from "../views/catalog/add-part-view";

@Component({
    selector: 'shopping',
    template: `
        <h3>Parts</h3>
        <add-part (add)="addPart($event)"></add-part>
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
    directives: [CORE_DIRECTIVES, PartsView, CartView, AddPartsView]
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
                this.cart = _appStore.getState().cart;
                this.updatePartsInCart(_appStore);
            }
        });

        ShoppingComponent.createInitialSetOfParts(_appStore, _partActions);

    }

    private static createInitialSetOfParts(appStore, partActions) {
        appStore.dispatch(partActions.addPart("Bumper"));
        appStore.dispatch(partActions.addPart("MP3 Player"));
        appStore.dispatch(partActions.addPart("Mirror"));
        appStore.dispatch(partActions.addPart("Hood"));
    };

    private updatePartsInCart(_appStore) {
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
    };

    private addPart(name) {
        this._appStore.dispatch(this._partActions.addPart(name));
    }

    private addPartToCart(id) {
        this._appStore.dispatch(this._cartActions.addToCart(id));
    }

    private removePartFromCart(id) {
        this._appStore.dispatch(this._cartActions.removeFromCart(id))
    }

}