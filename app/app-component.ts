import {Component, CORE_DIRECTIVES} from 'angular2/angular2'
import {bind, Injector} from 'angular2/core';
import {AppStore} from "./app-store";
import {CartComponent} from "./cart-component";

@Component({
    selector: 'my-app',
    template: `
        <h3>Parts</h3>
        <table>
            <tr *ng-for="#part of parts">
                <td><button href="" (click)="addPartToCart(part)">add</button></td>
                <td>{{part.name}}</td>
            </tr>
        </table>
        <cart/>
    `,
    directives: [CORE_DIRECTIVES, CartComponent]
})
export class AppComponent {
    parts = [];

    constructor(private appStore:AppStore) {

        const setParts = () => this.parts = appStore.getState().parts;

        appStore.subscribe(setParts);
        // initial set of parts
        setParts();

    }

    addPartToCart(part) {
        this.appStore.dispatch({type:"ADD_TO_CART",id:part.id})
    }

}