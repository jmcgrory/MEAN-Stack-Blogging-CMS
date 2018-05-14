import { Component, Input } from '@angular/core';
import { Feature } from '../../models/feature.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: '[feature]',
    templateUrl: './feature.component.html'
})
export class FeatureComponent {

    @Input() article: Feature;

    constructor() { }

    parse(upload: string): string {

        return 'http://localhost:3000' + upload.substring(1);

    }

}
