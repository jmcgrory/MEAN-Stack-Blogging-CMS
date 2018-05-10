import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostalService } from '../../services/postal.service';
import { Feature } from '../../models/feature.model';

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

    constructor(

        private postalService: PostalService

    ) {}

    parse(upload: string): string {

        return 'http://localhost:3000'+upload.substring(1);

    }

    ngOnInit() {

        const params = {

            limit: '2', // limit
                    
            offset: '2', // offset
            
            order: 'desc', // order

            active: 'true', // active
            
            fields: ['id', 'hero'], // fieldParams
            
            categories: ['design', 'development'], // categories
            
            excluding: ['5aae9c78fb28a40984d60cc3'], // excludedIds

        };

        this.postalService.getPosts(params).subscribe( data => {
            
            console.log(data);

        });

        this.postalService.getLimitPosts(4).subscribe( data => {
            
            this.featured = data;

        });

    }

}
