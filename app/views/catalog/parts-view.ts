import {Component, CORE_DIRECTIVES, Input, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/angular2'

import {createSelector} from 'rackt/reselect';

const partsInCartLookupSelector = createSelector(changeRecord => changeRecord.partsInCart.currentValue,
    partsInCart => partsInCart.reduce((map, part) => (map[part.id] = true) && map, {})
);
@Component({
    selector: 'parts',
    template: `
        <table>
            <tr *ng-for="#part of parts">
                <td>
                    <button style="margin-right:10px;margin-bottom:3px;margin-top:3px"
                        [disabled]="partsInCartLookup[part.id]"
                        (click)="addToCart.next(part.id)">add
                    </button>
                </td>
                <td>{{part.name}}</td>
            </tr>
        </table>
    `,
    directives: [CORE_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartsView {
    @Input() parts = [];
    @Input() partsInCart = [];
    partsInCartLookup = {};

    @Output() addToCart:EventEmitter = new EventEmitter();

    onChanges(changeRecord) {
        this.partsInCartLookup = partsInCartLookupSelector(changeRecord);
    }
}

