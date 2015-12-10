import {Component, CORE_DIRECTIVES, Input, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/angular2'

@Component({
    selector: 'cart',
    template: `
        <p [class.hidden]="parts.length>0" class="text-muted">Empty :(</p>
        <table>
            <tr *ng-for="#part of parts">
                <td>
                    <button style="margin-right:10px;margin-bottom:3px;margin-top:3px"
                        (click)="removeFromCart.next(part.id)">remove
                    </button>
                </td>
                <td>{{part.name}}</td>
            </tr>
        </table>
    `,
    directives: [CORE_DIRECTIVES],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartView {

    @Input() parts = [];
    @Output() removeFromCart: EventEmitter = new EventEmitter();

}