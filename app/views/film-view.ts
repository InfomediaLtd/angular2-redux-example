import {Component, CORE_DIRECTIVES, Input, Output, ChangeDetectionStrategy, EventEmitter} from 'angular2/angular2'

@Component({
    selector: 'film',
    template: `
        <label>{{data?.title}}</label><span *ng-if="loading" class="blink">loading...</span>
        <p>{{data?.opening_crawl}}</p>
    `,
    styles: [`
        .blink {
            margin-left:10px;
            -webkit-animation: blink .75s linear infinite;
            -moz-animation: blink .75s linear infinite;
            -ms-animation: blink .75s linear infinite;
            -o-animation: blink .75s linear infinite;
             animation: blink .75s linear infinite;
        }
        @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 1; }
            50.01% { opacity: 0; }
            100% { opacity: 0; }
        }
    `],    directives: [CORE_DIRECTIVES],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilmView {

    @Input() data = null;
    @Input() loading = false;

}