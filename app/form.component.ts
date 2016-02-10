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

export class FormComponent implements OnInit{

    constructor(http_: Http) {
        this.http = http_;
    }
    ngOnInit() {
        if (this.maxRadioButtonCount == null) {
            this.maxRadioButtonCount = 5
            console.log(this.maxRadioButtonCount)
        }
        console.log(this.maxRadioButtonCount)
        this.http.get(this.url)
        .subscribe(resp => this.schema = resp.json());
    }
    http = {}
    @Input() url
    @Input('max-radio-button-count') maxRadioButtonCount
    schema = {
        properties: {
            id: {
                type: 'number',
                title: 'Resource id',
            }
        },
    }
    mapping = {
        string: 'text',
        number: 'number',
        integer: 'number',
        object: 'object',
    }
    entity = {}
    isMappableToInput = function(schemaType) {
        return Object.keys(this.mapping).some(key => key == schemaType);
    };
    toInputType = function(property) {
        if (property.hasOwnProperty('type')) {
            return this.mapping[property.type]
        }
        else {
            if (property.hasOwnProperty('enum')) {
                if (property.enum.length <= this.maxRadioButtonCount) {
                    return 'radio'
                }
                else {
                    return 'select'
                }
            }
        }
    };
}
