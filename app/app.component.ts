import {Component} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {FormComponent} from './form.component'

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    viewProviders: [HTTP_PROVIDERS],
    directives: [FormComponent]
})

export class AppComponent {
    constructor(http_: Http) {
        this.http = http_;
    }
    update(event) {
        console.log(event);
    }
    ngOnInit() {
        this.http.get(this.url)
        .subscribe(resp => this.schema = resp.json());
    }
    http = {}
    url = 'test-hyper-schema.json'
    schema = {
        properties: {
            id: {
                type: 'number',
                title: 'Resource id',
            }
        },
    }
}
