import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostalService } from 'app/services/postal.service';
import { Post } from 'app/models/post.model';
import { Router } from '@angular/router';

@Component({

    selector: 'app-dashboard',

    templateUrl: './dashboard.component.html',

    styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {

    greeting: string;

    posts: Post[];

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

    ) {}

    ngOnInit() {

        // Loads random <h1> greeting :)
        this.randomGreeting();

        // Load all posts
        this.getPosts();
    
    }

    // Get all posts
    getPosts(): void {

        const params = {

            select: 'id url title date active category'

        }

        // Load all posts
        this.postalService.getPosts(params).subscribe( data => {

            this.posts = data;

            console.log(data);

        });

    }

    // Delete clicked post
    postDelete(id: string): void {

        this.postalService.deletePost(id).subscribe( data => {

            // Load all posts
            this.getPosts();

        });

    }

    // Add post
    postAdd(): void {

        this.postalService.addPost().subscribe( data => {
            
            // Load all posts
            this.getPosts();

        });

    }

    postActive(id: string, active: boolean): void{

        this.postalService.postActive(id, !active).subscribe( data => {

            // Load all posts
            this.getPosts();
        
        });

    }

}
