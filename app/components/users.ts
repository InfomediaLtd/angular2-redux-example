import {Component, CORE_DIRECTIVES, Input, ChangeDetectionStrategy} from 'angular2/angular2'

@Component({
    selector: 'users',
    template: `
        <table>
            <tr *ng-for="#user of users">
                <td>{{user.name}}</td>
            </tr>
        </table>
    `,
    directives: [CORE_DIRECTIVES],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UsersView {
    @Input() users = [];
}