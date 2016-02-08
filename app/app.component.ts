import {Component, Input, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {CORE_DIRECTIVES} from 'angular2/angular2';
import {ItemsPipe} from './pipe';

@Component({
    selector: 'json-schema-form',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'app/json-schema-form.html',
    pipes: [ItemsPipe],
})

export class AppComponent implements OnInit{

    constructor(http_: Http) {
        console.log('constructor invoked');
        this.http = http_;
        console.log(this.http);
        console.log(this.url);
    }
    ngOnInit() {
        console.log('init invoked');
        console.log(this.url);
        this.http.get(this.url)
        .subscribe(resp => this.schema = resp.json());
    }

    @Input() url;
    http = {};

    schema = {
        properties: {
            id: {
                type: 'number',
                title: 'Resource id',
            }
        },
    };
    entity = {};
    toInputType = function(schemaType) {
        var mapping = {
            string: 'text',
            number: 'number',
            integer: 'number',
        };
        return mapping[schemaType];
    }

    props = function () {
        return Object.keys(this.schema.properties);
    };
}
