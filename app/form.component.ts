import {Component, Input, Output, OnInit, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/angular2';
import {ItemsPipe} from './pipe';

@Component({
    selector: 'json-schema-form',
    templateUrl: 'app/json-schema-form.html',
    directives: [FormComponent],
    pipes: [ItemsPipe],
})

export class FormComponent implements OnInit{

    constructor() {
        this.entityChange = new EventEmitter()
    }

    ngOnInit() {
        if (this.maxRadioButtonCount == null) {
            this.maxRadioButtonCount = 5
        }
        this.entity = Object.keys(this.schema.properties).reduce(
            function(pv, cv) {
                if (cv.type == 'object') {
                    pv[cv] = {}
                    return pv
                }
                else {
                    return {}
                }
            },
            {}
        )
        console.log(this.entity);
    }
    @Input('max-radio-button-count') maxRadioButtonCount
    @Input() schema
    @Output() entityChange;
    mapping = {
        string: 'text',
        number: 'number',
        integer: 'number',
        object: 'object',
    }
    @Input() entity = {}
    isMappableToInput = function(schemaType) {
        return Object.keys(this.mapping).some(key => key == schemaType);
    }
    updateEntity(key, value) {
        this.entity[key] = value
        this.entityChange.emit(this.entity)
    }
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
    }

}
