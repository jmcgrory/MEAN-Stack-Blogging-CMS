import { Component, OnInit, Input } from '@angular/core';
import { HtmlPipe } from 'app/pipes/html.pipe';

@Component({
    selector: '[PostSection]',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

    @Input() section;

    constructor() { }

    ngOnInit() {
        console.log(this.section);
    }

}
