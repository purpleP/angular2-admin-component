import {Component, Input, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/angular2';
import {ItemsPipe} from './pipe';

@Component({
    selector: 'json-schema-form',
    templateUrl: 'app/json-schema-form.html',
    directives: [FormComponent],
    pipes: [ItemsPipe],
})

export class FormComponent implements OnInit{

    ngOnInit() {
        if (this.maxRadioButtonCount == null) {
            this.maxRadioButtonCount = 5
        }
        console.log(this.schema);
    }
    @Input('max-radio-button-count') maxRadioButtonCount
    @Input() schema
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
