import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {CORE_DIRECTIVES} from 'angular2/angular2';

@Component({
    selector: 'json-schema-form',
    templateUrl: 'app/json-schema-form.html',
})

export class AppComponent {
    constructor(http: Http) {
        console.log('lalal');
    };
    schema = {
        properties: {
            id: {
                type: 'number',
                title: 'Resource id',
            },
            name: {
                type: 'string',
                title: 'Some name',
            }
        }
    };
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
