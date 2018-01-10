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
  randomGreeting(){

    // Randomised Greetings
    let greetings = [
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
    // Loads random <h1> greeting :)
    this.randomGreeting();

    // Load all posts
    this.getAllPosts();
  }

  // Get all posts
  getAllPosts(){
    // Load all posts
    this.postalService.getAllPosts().subscribe( data => {
      this.posts = data;
    });
  }

  // Edit clicked post
  postEdit(id){
    console.log('Edit: '+id);
  }

  // Delete clicked post
  postDelete(id){
    this.postalService.deletePost(id).subscribe( data => {
      // Load all posts
      this.getAllPosts();
    });
  }

  // Add post
  postAdd(){
    this.postalService.addPost().subscribe( data => {
      // Load all posts
      this.getAllPosts();
    });
  }

  postActive(id, active){
    this.postalService.postActive(id, !active).subscribe( data => {
      // Load all posts
      this.getAllPosts();
    });
  }

}
