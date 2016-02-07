import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from 'angular2/core'
import {SimpleList} from 'angular2-simple-list';

@Component({
    selector: 'users',
    template: `
        <simple-list
            [list]="data"
            [content]="getContent"
            (current)="current.emit($event)">
    `,
    directives: [SimpleList],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UsersView {
    @Input() data = {};
    @Output() current:EventEmitter = new EventEmitter();

    getContent(user:any):string { return user.name; }

}
