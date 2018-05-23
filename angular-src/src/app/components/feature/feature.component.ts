import { Component, Input, OnInit } from '@angular/core';
import { Feature } from '../../models/feature.model';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
    selector: '[feature]',
    templateUrl: './feature.component.html'
})
export class FeatureComponent implements OnInit {

    hasArticle: boolean = false;

    @Input() article: Feature;

    constructor() { }

    ngOnInit() {

        if (typeof this.article !== 'undefined') {

            this.hasArticle = true;

        }

    }

    parse(upload: string): string {

        return environment.apiUrl + upload.substring(1);

    }

}
