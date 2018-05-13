import { Component, OnInit } from '@angular/core';
import { Feature } from '../../models/feature.model';
import { DatePipe } from '@angular/common';
import { PostalService } from '../../services/postal.service';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/models/category.model';

@Component({

    selector: 'app-articles',

    templateUrl: './articles.component.html',

    styleUrls: [ './articles.component.css' ]

})
export class ArticlesComponent implements OnInit {

    articles: Feature[] = [];

    categories: any[] = [];

    activeCategories: string[] = [];

    constructor(

        private postalService: PostalService,

        private categoryService: CategoryService

    ){}

    parse(upload: string): string {

        return 'http://localhost:3000'+upload.substring(1);

    }

    ngOnInit() {

        // Get Initial Posts
        this.getAllPosts();

        // Get Available Categories
        this.getAllCategories();

    }


    getAllPosts(): void {

        this.postalService.getAllPosts().subscribe(data => {

            this.articles = data;

        });

    }

    getAllCategories(): void {

        this.categoryService.getCategories().subscribe( data => {

            this.buildSelectableCategories(data);

        });

    }

    buildSelectableCategories(categories: Category[]): void {

        this.categories = categories.map( category => {

            return {

                active: false,
                
                name: category.name,

            }

        });

        console.log(this.categories);

    }

    selectCategory(index: number): void {

        this.categories[index].active = !this.categories[index].active;

        this.filterCategories();

    }

    filterCategories(): void {

        this.activeCategories = this.categories.filter( category => {

            return category.active;

        }).map( category => {

            return category.name;

        });

    }

}
