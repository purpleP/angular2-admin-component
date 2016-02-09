import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: 'items'
})
export class ItemsPipe implements PipeTransform {
    transform(dict: Object, args: any[]): any[] {
        return Object.keys(dict).map(key => {return {key: key, val: dict[key]};});
    };
    return;
}
