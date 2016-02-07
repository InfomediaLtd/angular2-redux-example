import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/core'
import {createSelector} from 'reselect';

const partsInCartLookupSelector = createSelector(partsInCart => partsInCart,
    partsInCart => partsInCart.reduce((partsInCartLookup, part) => Object.assign(partsInCartLookup, {[part.id]:true}), {})
);

@Component({
    selector: 'parts',
    template: `
        <table>
            <tr *ngFor="#part of parts">
                <td>
                    <button style="margin-right:10px;margin-bottom:3px;margin-top:3px"
                        [disabled]="partsInCartLookup[part.id]"
                        (click)="addToCart.emit(part.id)">add
                    </button>
                </td>
                <td>{{part.name}}</td>
            </tr>
        </table>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartsView {

    private partsInCartLookup = {};

    @Input() parts = [];
    @Output() addToCart:EventEmitter<number> = new EventEmitter();

    @Input()
    set partsInCart(partsInCart) {
      this.partsInCartLookup = partsInCartLookupSelector(partsInCart);
    }
}
