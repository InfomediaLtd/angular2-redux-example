import {Component, CORE_DIRECTIVES} from 'angular2/angular2'

import {AppStore} from "../stores/app-store";

import {AdminComponent} from "./admin-component";
import {ShoppingComponent} from "./shopping-component";
import {FilmsComponent} from "./films-component";

@Component({
    selector: 'my-app',
    template: `
        <div class="row">
            <div class="col-md-6">
                <admin></admin>
            </div>
            <div class="col-md-6">
                <shopping></shopping>
                <hr/>
                <films-component></films-component>
            </div>
        </div>
    `,
    directives: [CORE_DIRECTIVES, ShoppingComponent, AdminComponent, FilmsComponent]
})
export class AppView {

}