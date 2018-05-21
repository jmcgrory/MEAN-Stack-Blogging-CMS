import { Component, OnInit } from '@angular/core';
import { Skill } from '../../models/skill.model';
import { MetaService } from '../../services/meta.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

    aboutTitle: string = '';

    aboutContent: string = '';

    aboutSnippet: string = '';

    technicalTitle: string = '';

    technicalContent: string = '';

    technicalSkills: string[] = [];

    constructor(
        private metaService: MetaService
    ) { }

    ngOnInit() {

        this.getContent();

    }

    getContent() {

        this.metaService.get('about technical').subscribe((data) => {

            this.aboutTitle = data.about.title;

            this.aboutContent = data.about.content;

            this.aboutSnippet = data.about.snippet;

            this.technicalTitle = data.technical.title;

            this.technicalContent = data.technical.content;

            this.technicalSkills = data.technical.skills;

        });

    }

}
