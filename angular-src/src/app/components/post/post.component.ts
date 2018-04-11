import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { PostalService } from 'app/services/postal.service';
import { Post } from 'app/models/post.model';
import { HtmlPipe } from 'app/pipes/html.pipe';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  private sub: any;
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private postalService: PostalService
  ) { }

  ngOnInit() {

    // To the Top
    setTimeout(function(){window.scrollTo(0, 1)}, 0);

    // Subscribe to the search Params and pass them to getPostByURL() to return post data
    this.sub = this.route.params.subscribe( params => {
      this.postalService.getPostByURL(params.url).subscribe( data => {
        this.post = data;
        console.log(this.post.body);
      });
    });

  }

  // Unsubscribe on leave
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
