import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges} from 'angular2/core'

import {createSelector} from 'rackt/reselect';

const partsInCartLookupSelector = createSelector(changeRecord => changeRecord.partsInCart.currentValue,
    partsInCart => partsInCart.reduce((map, part) => (map[part.id] = true) && map, {})
);
@Component({
    selector: 'parts',
    template: `
        <table>
            <tr *ngFor="#part of parts">
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartsView implements OnChanges {
    @Input() parts = [];
    @Input() partsInCart = [];
    partsInCartLookup = {};

    @Output() addToCart:EventEmitter = new EventEmitter();

    ngOnChanges(changeRecord) {
        this.partsInCartLookup = partsInCartLookupSelector(changeRecord);
    }
}

