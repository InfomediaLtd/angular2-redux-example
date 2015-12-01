import {Component, CORE_DIRECTIVES, Input, ChangeDetectionStrategy} from 'angular2/angular2'

@Component({
    selector: 'user',
    template: `
        <div *ng-if="data">
            <span>name:</span><label>{{data.name}}</label>
            <span>email:</span><label>{{data.email}}</label>
        </div>
    `,
    directives: [CORE_DIRECTIVES],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserView {
    @Input() data = {};
}