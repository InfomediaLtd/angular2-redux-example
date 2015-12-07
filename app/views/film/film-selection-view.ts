import {Component, CORE_DIRECTIVES, Input, Output, ChangeDetectionStrategy, EventEmitter} from 'angular2/angular2'

@Component({
    selector: 'film-selection',
    template: `
        <button type="button"
            *ng-for="#item of list"
            class="vehicle-selection"
            [ng-class]="{'btn-primary':item==currentSelection}"
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
    directives: [CORE_DIRECTIVES],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilmSelectionView {

    @Input() count = 0;
    @Output() current:EventEmitter = new EventEmitter();

    private currentSelection = null;
    private list;

    onChanges() {
        this.list = (this.count>0?Array.apply(null, Array(this.count)).map((x, index) => index):[]);
    }

    private select(item) {
        this.currentSelection = item;
        this.current.next(item);
    }


}