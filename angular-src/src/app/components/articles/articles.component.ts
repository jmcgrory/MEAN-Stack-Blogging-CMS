import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostalService } from '../../services/postal.service';
import { CategoryService } from 'app/services/category.service';
import { FeatureComponent } from '../feature/feature.component';
import { Category } from 'app/models/category.model';
import { Feature } from '../../models/feature.model';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

    @HostListener("window:scroll", ['$event'])
    onWindowScroll(e) {

        const window = e.path[1];

        let firstPlaceholderScroll = 0;

        const pageHeight = window.innerHeight;

        const scrollTop = window.pageYOffset + pageHeight;

        const placeholder = e.target.getElementsByClassName('placeholder');

        if (typeof placeholder !== 'undefined' && placeholder.length) {

            const first = placeholder.item(0);

            firstPlaceholderScroll = first.offsetTop;

        }

        const shouldLoad = scrollTop > firstPlaceholderScroll;

        if (shouldLoad && this.currentPostCount < this.maxPostCount && !this.loading) {

            this.getPosts(true);

        }

    }

    articles: Feature[] = [];

    placeholders: Array<any> = [];

    categories: any[] = [];

    activeCategories: string[] = [];

    filterParams: object;

    maxPostCount: number = 0;

    currentPostCount: number = 0;

    queryCategory: string = null;

    loading: boolean = false;

    // Window Objects

    firstPlaceholderScroll: number = 0;

    constructor(
        private route: ActivatedRoute,
        private postalService: PostalService,
        private categoryService: CategoryService
    ) { }

    parse(upload: string): string {

        return 'http://localhost:3000' + upload.substring(1);

    }

    ngOnInit() {

        // Initially Set Filter Params
        this.resetFilterParams();

        // Check if query category
        this.getQueryCategory();

        // Get Available Categories
        this.getAllCategories();

        // Count Posts
        this.countPosts();

    }

    updatePlaceholderArticles(): void {

        const diff = this.maxPostCount - this.currentPostCount;

        const adjustedDiff = (diff > 6) ? 6 : diff;

        if (adjustedDiff > 0) {

            this.placeholders = Array(adjustedDiff).fill(0);

        } else {

            this.placeholders = [];

        }

    }

    getQueryCategory(): void {

        const queryCategory = this.route.queryParams.subscribe(query => {

            if (query.hasOwnProperty('category')) {

                this.queryCategory = query.category;

            } else {

                this.getPosts();

            }

        });

    }

    countPosts(): void {

        this.postalService.countPosts(this.filterParams).subscribe(count => {

            this.maxPostCount = count.count;

            this.updatePlaceholderArticles();

        });

    }

    getPosts(addByOffset: boolean = false): void {

        // Set Loading State

        this.loading = true;

        const params = this.filterParams;

        params['offset'] = addByOffset ? this.articles.length : 0;

        params['select'] = 'id hero title url date';

        this.postalService.getPosts(params).subscribe(data => {

            if (!addByOffset) {

                this.articles = data;

            } else {

                this.articles = this.articles.concat(data);

            }

            this.currentPostCount = this.articles.length;

            // Reset loading state

            this.loading = false;

            this.updatePlaceholderArticles();

        });

    }

    getAllCategories(): void {

        this.categoryService.getCategories().subscribe(data => {

            this.buildSelectableCategories(data);

        });

    }

    buildSelectableCategories(categories: Category[]): void {

        this.categories = categories.map(category => {

            return {

                active: false,

                name: category.name,

            }

        });

        if (this.queryCategory) {

            let index = null;

            this.categories.forEach((category, categoryIndex) => {

                if (category.name === this.queryCategory) {

                    index = categoryIndex;

                }

            });

            if (index !== null) {

                this.selectCategory(index);

            }

        }

    }

    selectCategory(index: number): void {

        this.categories[index].active = !this.categories[index].active;

        this.filterCategories();

    }

    resetFilterParams(): void {

        this.filterParams = {

            active: 'true',

            limit: '6',

        }

    }

    filterCategories(): void {

        this.activeCategories = this.categories.filter(category => {

            return category.active;

        }).map(category => {

            return category.name;

        });

        if (this.activeCategories.length) {

            this.filterParams['categories'] = this.activeCategories;

        } else {

            this.resetFilterParams();

        }

        // Re Request Count
        this.countPosts();

        // Re Request Posts
        this.getPosts();

    }

}
