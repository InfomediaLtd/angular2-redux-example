import {Component,OnDestroy} from 'angular2/core'
import {AppStore} from "angular2-redux";
import {CartActions} from "../actions/cart-actions";
import {PartActions} from "../actions/part-actions";
import {PartsView} from "../views/catalog/parts-view";
import {CartView} from "../views/catalog/cart-view";
import {AddPartsView} from "../views/catalog/add-part-view";
import {createSelector} from 'reselect';

// select the parts in cart
const partsInCartSelector = createSelector(state=>state.cart, state=>state.parts,
    (cart, parts) => {
        const partsById = parts.reduce((partsById, part) => Object.assign(partsById, {[part.id]:part}), {});
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
export class ShoppingComponent implements OnDestroy {

    private parts = [];
    private partsInCart = [];

    private addPart;
    private addPartToCart;
    private removePartFromCart;

    private unsubscribeFromStore:()=>void;

    constructor(appStore:AppStore, partActions:PartActions, cartActions:CartActions) {

        this.addPart            = partActions.createDispatcher(partActions.addPart);
        this.addPartToCart      = cartActions.createDispatcher(cartActions.addToCart);
        this.removePartFromCart = cartActions.createDispatcher(cartActions.removeFromCart);

        this.unsubscribeFromStore = appStore.subscribe((state) => {
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

    public ngOnDestroy() { this.unsubscribeFromStore(); }

}
