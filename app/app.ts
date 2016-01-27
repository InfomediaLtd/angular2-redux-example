import {Component} from 'angular2/core'
import {AppStore} from "angular2-redux";
import {AdminComponent} from "./components/admin-component";
import {ShoppingComponent} from "./components/shopping-component";

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
    directives: [ShoppingComponent, AdminComponent]
})
export class AppComponent {

}
