import {Component} from '@angular/core'
import {AppStore} from "angular2-redux";

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
    `
})
export class AppComponent {

}
