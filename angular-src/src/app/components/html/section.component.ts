import { Component, OnInit, Input } from '@angular/core';
import { HtmlPipe } from 'app/pipes/html.pipe';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit {

    @Input() section;

    constructor() { }

    ngOnInit() {
        console.log(this.section);
    }

}
