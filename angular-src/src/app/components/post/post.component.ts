import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { HtmlPipe } from 'app/pipes/html.pipe';
import { PostalService } from 'app/services/postal.service';
import { Post } from 'app/models/post.model';
import { FeatureComponent } from '../feature/feature.component';
import { Feature } from '../../models/feature.model';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

    private sub: any;

    private loginState: any;

    post: Post;

    relatedArticles: Feature[];

    loggedIn: boolean;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private postalService: PostalService
    ) {

        this.loginState = this.authService.getLoginState().subscribe(value => {

            this.loggedIn = value;

        });

    }

    parse(upload: string): string {

        return environment.apiUrl + upload.substring(1);

    }

    ngOnInit() {

        // To the Top
        setTimeout(function () { window.scrollTo(0, 1) }, 0);

        // Subscribe to the search Params and pass them to getPostByURL() to return post data
        this.sub = this.route.params.subscribe(params => {

            this.postalService.getPostByURL(params.url).subscribe(data => {

                this.post = data;

                this.getRelatedPosts();

            });

        });

    }

    ngOnDestroy() {

        this.loginState.unsubscribe();

        this.sub.unsubscribe();

    }

    getRelatedPosts(): void {

        const params = {

            active: 'true',

            limit: '4',

            select: ['url', 'hero', 'title', 'date'],

            categories: this.post.category,

            excluding: [this.post._id]

        };

        this.postalService.getPosts(params).subscribe(data => {

            this.relatedArticles = data;

        });

    }

}
