import {Component} from 'angular2/core'

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
    directives: [ShoppingComponent, AdminComponent, FilmsComponent]
})
export class AppView {

}