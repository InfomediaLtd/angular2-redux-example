import {Component} from 'angular2/core'
import {AppStore} from "angular2-redux";
import {CartActions} from "../actions/cart-actions";
import {PartActions} from "../actions/part-actions";
import {PartsView} from "../views/catalog/parts-view";
import {CartView} from "../views/catalog/cart-view";
import {AddPartsView} from "../views/catalog/add-part-view";
import {createSelector} from 'rackt/reselect';

// select the parts in cart
const partsInCartSelector = createSelector(state=>state.cart, state=>state.parts,
    (cart, parts) => {
        const partsById = parts.reduce((map, part) => (map[part.id] = part) && map, {});
        return cart.map(id => partsById[id]);
    });

@Component({
    selector: 'shopping',
    template: `
        <h3>Parts</h3>
        <add-part (add)="addPart($event)"></add-part>
        <parts [parts]="parts" [partsInCart]="partsInCart" (addToCart)="addPartToCart($event)"></parts>
        <hr/>
        <h3>Cart</h3>
        <cart [parts]="partsInCart" (removeFromCart)="removePartFromCart($event)"></cart>
    `,
    directives: [PartsView, CartView, AddPartsView]
})
export class ShoppingComponent {

    private parts = [];
    private partsInCart = [];

    private addPart;
    private addPartToCart;
    private removePartFromCart;

    constructor(appStore:AppStore, partActions:PartActions, cartActions:CartActions) {

        this.addPart            = partActions.createDispatcher(appStore, partActions.addPart);
        this.addPartToCart      = cartActions.createDispatcher(appStore, cartActions.addToCart);
        this.removePartFromCart = cartActions.createDispatcher(appStore, cartActions.removeFromCart);

        appStore.subscribe((state) => {
            this.parts = state.parts;
            this.partsInCart = partsInCartSelector(state);
        });

        ShoppingComponent.createInitialSetOfParts(appStore, partActions);

    }

    private static createInitialSetOfParts(appStore, partActions) {
        appStore.dispatch(partActions.addPart("Bumper"));
        appStore.dispatch(partActions.addPart("MP3 Player"));
        appStore.dispatch(partActions.addPart("Mirror"));
        appStore.dispatch(partActions.addPart("Hood"));
    };

}