import {Component, CORE_DIRECTIVES} from 'angular2/angular2'
import {bind, Injector} from 'angular2/core';
import {AppStore} from "./app-store";
import {CartComponent} from "./cart-component";
import {PartsComponent} from "./parts-component";

@Component({
    selector: 'my-app',
    template: `
        <h3>Parts</h3>
        <parts></parts>
        <h3>Ordered Parts</h3>
        <cart></cart>
    `,
    directives: [CORE_DIRECTIVES, PartsComponent, CartComponent]
})
export class AppComponent {
}