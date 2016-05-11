import {Component} from '@angular/core'
import {AppStore} from "angular2-redux";
import {CartActions} from "../actions/cart-actions";
import {PartActions} from "../actions/part-actions";
import {PartsView} from "../views/catalog/parts-view";
import {CartView} from "../views/catalog/cart-view";
import {AddPartsView} from "../views/catalog/add-part-view";
import {createSelector} from 'reselect';
import {partsByIdSelector} from "../selectors/parts-selector";
import {cartSelector} from "../selectors/cart-selector";

const partsInCartSelector = createSelector(cartSelector, partsByIdSelector, (cart, partsById) => cart.map(id => partsById[id]));

@Component({
    selector: 'shopping',
    template: `
        <h3>Parts</h3>
        <add-part (add)="addPart($event)"></add-part>
        <parts [parts]="parts$ | async" [partsInCart]="partsInCart$ | async" (addToCart)="addPartToCart($event)"></parts>
        <hr/>
        <h3>Cart</h3>
        <cart [parts]="partsInCart$ | async" (removeFromCart)="removePartFromCart($event)"></cart>
    `,
    directives: [PartsView, CartView, AddPartsView]
})
export class ShoppingComponent {

    private parts$ = null;
    private partsInCart$ = null;

    private addPart;
    private addPartToCart;
    private removePartFromCart;

    private unsubscribeFromStore:()=>void;

    constructor(appStore:AppStore, partActions:PartActions, cartActions:CartActions) {

        this.addPart            = partActions.createDispatcher(partActions.addPart);
        this.addPartToCart      = cartActions.createDispatcher(cartActions.addToCart);
        this.removePartFromCart = cartActions.createDispatcher(cartActions.removeFromCart);

        this.parts$ = appStore.select("parts");
        this.partsInCart$ = appStore.select(partsInCartSelector);

        ShoppingComponent.createInitialSetOfParts(appStore, partActions);

    }

    private static createInitialSetOfParts(appStore, partActions) {
        appStore.dispatch(partActions.addPart("Bumper"));
        appStore.dispatch(partActions.addPart("MP3 Player"));
        appStore.dispatch(partActions.addPart("Mirror"));
        appStore.dispatch(partActions.addPart("Hood"));
    };

}
