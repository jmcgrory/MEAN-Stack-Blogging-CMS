import { Component, OnInit } from '@angular/core';
import { PostalService } from '../../services/postal.service';
import { MetaService } from '../../services/meta.service';
import { Feature } from '../../models/feature.model';
import { FeatureComponent } from '../feature/feature.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    featured: Feature[];

    events: any;

    date_start: number;

    date_end: number;

    title: string = '';

    content: string = '';

    constructor(
        private postalService: PostalService,
        private metaService: MetaService
    ) { }

    ngOnInit() {

        // Get Content
        this.getContent();

        // Get Posts
        this.getPosts();

    }

    getContent(): void {

        this.metaService.get('home').subscribe(data => {

            this.title = data.home.title;

            this.content = data.home.content;

        });

    }

    getPosts(): void {

        const params = {

            active: 'true',

            limit: '4',

            select: ['url', 'hero', 'title', 'date'],

            categories: ['design', 'development'],

        };

        this.postalService.getPosts(params).subscribe(data => {

            this.featured = data;

        });

    }

}
