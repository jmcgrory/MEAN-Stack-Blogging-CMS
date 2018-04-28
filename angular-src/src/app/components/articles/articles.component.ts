import { Component, OnInit } from '@angular/core';
import { Feature } from '../../models/feature.model';
import { DatePipe } from '@angular/common';
import { PostalService } from '../../services/postal.service';

@Component({
selector: 'app-articles',
templateUrl: './articles.component.html',
styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

    articles: Feature[];

    constructor(

        private postalService: PostalService

    ){}

    ngOnInit() {

        this.postalService.getAllPosts().subscribe(data => {

            this.articles = data;

        });

    }

}
