import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostalService } from 'app/services/postal.service';
import { Post } from 'app/models/post.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    greeting: string;

    posts: Post[];

    count: number;

    currentPostCount: number = 0;

    params: object;

    // Randomisation
    randomGreeting(): void {

        // Randomised Greetings
        const greetings: string[] = [

            "Bok prijatelju", // Croatian

            "Ahoj příteli", // Czech

            "Hej ven", // Danish

            "Hallo vriend", // Dutch

            "Salut l'ami", // French

            "Hei ystävä", // Finnish

            "Hallo Freund", // German

            "Helló barát", // Hungarian

            "Ciao amico", // Italian

            "Salut prietene", // Romanian

            "Caraid hello", // Scottish Gaelic

            "Hola amigo", // Spanish

            "Hej kompis", // Swedish

        ];

        this.greeting = greetings[Math.floor(Math.random() * greetings.length)];

    }

    constructor(
        private postalService: PostalService,
        private router: Router
    ) { }

    ngOnInit() {

        // Set params
        this.resetParams();

        // Get Count
        this.getCount();

        // Loads random <h1> greeting :)
        this.randomGreeting();

        // Load all posts
        this.getPosts();

    }

    getCount(): void {

        this.postalService.countPosts({}).subscribe(count => {

            this.count = count.count;

        });

    }

    resetParams(): void {

        this.params = {

            select: 'id url title date active category'

        }

    }

    // Load more posts
    getMorePosts(): void {

        this.resetParams();

        this.params['offset'] = this.currentPostCount;

        this.getPosts();

    }

    // Get all posts
    getPosts(addToStart: boolean = false): void {

        // Load all posts
        this.postalService.getPosts(this.params).subscribe(data => {

            if (this.posts && this.posts.length) {

                if (addToStart) {

                    this.posts = data.concat(this.posts);

                } else {

                    this.posts = this.posts.concat(data);

                }

            } else {

                this.posts = data;

            }

            this.currentPostCount = this.posts.length;

        });

    }

    // Delete clicked post
    postDelete(id: string): void {

        this.postalService.deletePost(id).subscribe(data => {

            // Load all posts
            this.getPosts();

        });

    }

    // Add post
    postAdd(): void {

        this.postalService.addPost().subscribe(data => {

            // Get Count
            this.getCount();

            // Set params
            this.resetParams();

            this.params['limit'] = 1;

            // Load all posts
            this.getPosts(true);

        });

    }

    postActive(post): void {

        post.active = !post.active;

        const id: string = post._id;

        const active: boolean = post.active;

        this.postalService.postActive(id, active).subscribe(data => {

            // Load all posts
            //this.getPosts();

        });

    }

}
