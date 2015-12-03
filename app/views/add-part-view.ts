import {Component, CORE_DIRECTIVES, ChangeDetectionStrategy} from 'angular2/angular2'
import {AppStore} from "../stores/app-store";
import {PartActions} from "../actions/part-actions";

@Component({
    selector: 'add-part',
    template: `
        <form class="form-inline" (ng-submit)="addPart(name.value);name.value=''">
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

    constructor(private _appStore:AppStore,
                private _partActions:PartActions) {
    }
    addPart(partName) {
        this._appStore.dispatch(this._partActions.addPart(partName));
    }
}