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

    listmymovies(){

        const mymovies = [
            "Jaws",
            "Moulin Rouge",
            "The Notebook"
        ]

        return mymovies;

    }

    ngOnInit() {

        const params = {

            limit: '4', // limit
            
            fields: ['url', 'hero', 'title', 'date'], // fieldParams
            
            categories: ['design', 'development'], // categories

        };

        this.postalService.getPosts(params).subscribe( data => {

            console.log(data);
            
            this.featured = data;

        });

    }

}
