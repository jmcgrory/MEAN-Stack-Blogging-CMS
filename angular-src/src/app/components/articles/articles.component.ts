import { Component, OnInit } from '@angular/core';
import { Feature } from '../../models/feature.model';
import { DatePipe } from '@angular/common';
import { PostalService } from '../../services/postal.service';

@Component({

    selector: 'app-articles',

    templateUrl: './articles.component.html'

})
export class ArticlesComponent implements OnInit {

    articles: Feature[];

    constructor(

        private postalService: PostalService

    ){}

    parse(upload: string): string {

        return 'http://localhost:3000'+upload.substring(1);

    }

    ngOnInit() {

        this.postalService.getAllPosts().subscribe(data => {

            this.articles = data;

        });

    }

}
