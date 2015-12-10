import {Component, CORE_DIRECTIVES} from 'angular2/angular2'
import {AppStore} from "../stores/app-store";
import {CartActions} from "../actions/cart-actions";
import {PartActions} from "../actions/part-actions";
import {PartsView} from "../views/catalog/parts-view";
import {CartView} from "../views/catalog/cart-view";
import {AddPartsView} from "../views/catalog/add-part-view";
import {createSelector} from 'rackt/reselect/src/index.js';

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
        <parts [parts]="parts" [parts-in-cart]="partsInCart" (add-to-cart)="addPartToCart($event)"></parts>
        <hr/>
        <h3>Cart</h3>
        <cart [parts]="partsInCart" (remove-from-cart)="removePartFromCart($event)"></cart>
    `,
    directives: [CORE_DIRECTIVES, PartsView, CartView, AddPartsView]
})
export class ShoppingComponent {

    private parts = [];
    private partsInCart = [];

    private addPart            :()=>void;
    private addPartToCart      :()=>void;
    private removePartFromCart :()=>void;

    constructor(appStore:AppStore, partActions:PartActions, cartActions:CartActions) {

        this.addPart            = appStore.createDispatcher(partActions.addPart,partActions);
        this.addPartToCart      = appStore.createDispatcher(cartActions.addToCart,cartActions);
        this.removePartFromCart = appStore.createDispatcher(cartActions.removeFromCart,cartActions);

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