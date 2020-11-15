import { Component, Input } from '@angular/core';
import { HtmlPipe } from 'app/pipes/html.pipe';

@Component({
    selector: '[PostSection]',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss']
})
export class SectionComponent {

    @Input() section;

    constructor() { }

}
