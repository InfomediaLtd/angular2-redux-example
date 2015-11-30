import {Component, CORE_DIRECTIVES, Input, Output, EventEmitter} from 'angular2/angular2'

import {AppStore} from "../app-store";

@Component({
    selector: 'parts',
    template: `
        <table>
            <tr *ng-for="#part of parts">
                <td><button [disabled]="!!unavailable[part.id]" href="" (click)="addToCart.next(part.id)">add</button></td>
                <td>{{part.name}}</td>
            </tr>
        </table>
    `,
    directives: [CORE_DIRECTIVES]
})
export class PartsView {
    @Input() parts = [];
    @Input() unavailable = {};

    @Output() addToCart: EventEmitter = new EventEmitter();

}