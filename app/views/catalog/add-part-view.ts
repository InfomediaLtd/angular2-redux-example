import {Component, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core'

@Component({
    selector: 'add-part',
    template: `
        <form class="form-inline" (submit)="onSubmit($event,name.value);name.value=''">
            <div class="form-group">
                <input #name type="text" class="form-control" placeholder="Part Name" autocomplete="off">
            </div>
            <button type="submit" class="btn btn-default">Add</button>
        </form>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddPartsView {

    @Output() add:EventEmitter<string> = new EventEmitter();

    private onSubmit($event, value) {
        $event.preventDefault();
        this.add.emit(value);
    }
}
