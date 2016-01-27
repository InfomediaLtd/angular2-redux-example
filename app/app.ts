import {Component} from 'angular2/core'
import {AppStore} from "angular2-redux";
import {ShoppingComponent} from "./components/shopping-component";

@Component({
    selector: 'my-app',
    template: `<shopping></shopping>`,
    directives: [ShoppingComponent]
})
export class AppComponent {

}
