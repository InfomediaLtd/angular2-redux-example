import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../app-store";
import {PartsView} from "./parts";
import {CartView} from "./cart";

@Component({
    selector: 'my-app',
    template: `
        <h3>Parts</h3>
        <parts></parts>
        <h3>Ordered Parts</h3>
        <cart></cart>
    `,
    directives: [CORE_DIRECTIVES, PartsView, CartView]
})
export class AppView {
}