import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core'

@Component({
    selector: 'users',
    template: `
        <simple-list
            [list]="data"
            [content]="getContent"
            (current)="current.emit($event)">
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UsersView {
    @Input() data = {};
    @Output() current:EventEmitter<string> = new EventEmitter<string>();

    getContent(user:any):string { return user.name; }

}
