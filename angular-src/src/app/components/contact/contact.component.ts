import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../services/meta.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

    title: string = '';

    content: string = '';

    constructor(
        private metaService: MetaService
    ) { }

    ngOnInit() {

        this.metaService.get('contact').subscribe(data => {

            this.title = data.contact.title;

            this.content = data.contact.content;

        });

    }

}
