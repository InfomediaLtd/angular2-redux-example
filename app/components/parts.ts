import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../app-store";

@Component({
    selector: 'parts',
    template: `
        <table>
            <tr *ng-for="#part of parts">
                <td><button [disabled]="!!cartLookup[part.id]" href="" (click)="addPartToCart(part)">add</button></td>
                <td>{{part.name}}</td>
            </tr>
        </table>
    `,
    directives: [CORE_DIRECTIVES]
})
export class PartsView {
    parts = [];
    cartLookup = {};

    constructor(private appStore:AppStore) {

        const setParts = () => {
            this.parts = appStore.getState().parts;
            this.cartLookup = appStore.getState().cart.reduce((map, id) => {
                map[id]=true;
                return map;
            },{});
        };

        appStore.subscribe(setParts);
        // initial set of parts
        setParts();

    }

    addPartToCart(part) {
        this.appStore.dispatch({type:"ADD_TO_CART",id:part.id})
    }

}