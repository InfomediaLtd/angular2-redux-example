import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from 'angular2/core'

@Component({
    selector: 'film-selection',
    template: `
        <button type="button"
            *ngFor="#item of list"
            class="vehicle-selection"
            [ngClass]="{'btn-primary':item==currentSelection}"
            (click)="select(item)"
            >
            {{item+1}}
        </button>
    `,
    styles: [`
        .vehicle-selection {
            margin-right:8px;
        }
    `],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilmSelectionView {

    private currentSelection = null;
    private list;

    @Output() current:EventEmitter<number> = new EventEmitter();

    @Input() set count(count) {
        this.list = (count>0?Array.apply(null, Array(count)).map((x, index) => index):[]);
    }

    private select(item) {
        this.currentSelection = item;
        this.current.emit(item);
    }


}
