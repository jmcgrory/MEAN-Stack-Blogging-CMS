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
        this.getPosts();

        // Get Available Categories
        this.getAllCategories();

        const params = {

            active: 'true'

        }

        this.postalService.countPosts(params).subscribe(data => {

            console.log(data);

        });

    }


    getPosts(addByOffset: boolean = false): void {

        const params = {

            active: 'true',
            
            select: ['url', 'title', 'date', 'hero']

        }

        params['offset'] = addByOffset ? this.articles.length : 0;

        if(this.activeCategories.length > 0){

            params['categories'] = this.activeCategories;

        }

        this.postalService.getPosts(params).subscribe(data => {

            if(!addByOffset){

                this.articles = data;

            } else {

                this.articles = this.articles.concat(data);

            }

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

        this.getPosts();

    }

}
