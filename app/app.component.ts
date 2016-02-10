import {Component} from 'angular2/core'
import {FormComponent} from './form.component'

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [FormComponent]
})

export class AppComponent {
}
