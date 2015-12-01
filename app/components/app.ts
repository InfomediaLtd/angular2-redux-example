import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../stores/app-store";

import {AdminComponent} from "./admin-component";
import {ShoppingComponent} from "./shopping-component";


@Component({
    selector: 'my-app',
    template: `
        <div class="row">
            <div class="col-md-6">
                <admin></admin>
            </div>
            <div class="col-md-6">
                <shopping></shopping>
            </div>
        </div>
    `,
    directives: [CORE_DIRECTIVES, ShoppingComponent, AdminComponent]
})
export class AppView {

}