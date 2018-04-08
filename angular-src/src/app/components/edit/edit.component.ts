import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PostalService } from 'app/services/postal.service';
import { Post } from 'app/models/post.model';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/models/category.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private sub: any;
  post: Post;
  categories: Category[] = [];
  selectedCategories:string[] = [];

  constructor(
    private route: ActivatedRoute,
    private postalService: PostalService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {

    // Subscribe to the search Params and pass them to getPostByURL() to return post data
    this.sub = this.route.params.subscribe( params => {
      this.postalService.getPostByID(params._id).subscribe( data => {
        this.post = data;
        if(data.category!==undefined){
          this.selectedCategories = data.category;
        }
      });
    });

    // Update Categories
    this.categoryService.getCategories().subscribe( data => {
      this.categories = data;
    });
  }

  editPostMeta(){
    if(!this.post.category){
      this.post.category=this.selectedCategories;
    }
    this.postalService.updatePostMeta(this.post).subscribe( data => {
      console.log(data);
    });
  }

  // Unsubscribe on leave
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
