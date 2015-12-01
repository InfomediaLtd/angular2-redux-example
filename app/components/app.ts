import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../stores/app-store";

import {CartActions} from "../actions/cart-actions";
import {UserActions} from "../actions/user-actions";
import {PartActions} from "../actions/part-actions";

import {PartsView} from "../views/parts";
import {CartView} from "../views/cart";
import {UsersView} from "../views/users";
import {UserView} from "../views/user";

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
        <users
            [users]="users"
            (current)="setCurrentUser($event)">
        </users>
        <hr/>
        <h3>Current User</h3>
        <user [data]="currentUser">
        </user>
    `,
    directives: [CORE_DIRECTIVES, PartsView, CartView, UsersView, UserView]
})
export class AppView {

    private parts = [];
    private partIdsInCart = [];
    private cart = [];
    private partsInCart = [];
    private users = [];
    private currentUser = null;

    constructor(
        private _appStore:AppStore,
        private _partActions:PartActions,
        private _cartActions:CartActions,
        private _userActions:UserActions) {

        _appStore.subscribe(() => {
            var state = _appStore.getState();

            this.parts = state.parts;
            if (this.cart !== state.cart) {
                this.onCartChange(_appStore);
            }
            this.users = state.users;
            this.currentUser = state.users.current;

        });

        _appStore.dispatch(_userActions.fetchUsers());

        this.createInitialSetOfParts(_appStore);

    }

    private createInitialSetOfParts(_appStore) {
        _appStore.dispatch(this._partActions.addPart("Bumper"));
        _appStore.dispatch(this._partActions.addPart("MP3 Player"));
        _appStore.dispatch(this._partActions.addPart("Mirror"));
        _appStore.dispatch(this._partActions.addPart("Hood"));
    };

    private onCartChange(_appStore) {
        var partsById = _appStore.getState().parts.reduce((map, part) => {
            map[part.id] = part;
            return map;
        }, {});
        var computed = _appStore.getState().cart.reduce(({partsInCart,partIdsInCart}, id) => {
            partsInCart.push(partsById[id]);
            partIdsInCart[id] = true;
            return {partsInCart,partIdsInCart};
        }, {partsInCart:[],partIdsInCart:{}});
        this.partsInCart = computed.partsInCart;
        this.partIdsInCart = computed.partIdsInCart;

    };

    addPartToCart(id) {
        this._appStore.dispatch(this._cartActions.addToCart(id));
    }
    removePartFromCart(id) {
        this._appStore.dispatch(this._cartActions.removeFromCart(id))
    }
    setCurrentUser(id) {
        this._appStore.dispatch(this._userActions.setCurrentUser(id))
    }

}