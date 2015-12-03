import {Component, CORE_DIRECTIVES, Input, Output, ChangeDetectionStrategy, EventEmitter} from 'angular2/angular2'
import {SimpleList} from 'InfomediaLtd/angular2-simple-list/app/components/simple-list.ts!';

@Component({
    selector: 'users',
    template: `
        <simple-list
            [list]="data"
            [content]="getContent"
            (current)="current.next($event)">
    `,
    directives: [CORE_DIRECTIVES, SimpleList],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UsersView {
    @Input() data = {};
    @Output() current:EventEmitter = new EventEmitter();

    getContent(user:any):string { return user.name; }

}