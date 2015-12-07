import {Component, CORE_DIRECTIVES, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/angular2'

@Component({
    selector: 'add-part',
    template: `
        <form class="form-inline" (submit)="$event.preventDefault();add.next(name.value);name.value=''">
            <div class="form-group">
                <input #name type="text" class="form-control" id="partNameInput" placeholder="Part Name" autocomplete="off">
            </div>
            <button type="submit" class="btn btn-default">Add</button>
        </form>
    `,
    directives: [CORE_DIRECTIVES],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddPartsView {

    @Output() add:EventEmitter = new EventEmitter();

}