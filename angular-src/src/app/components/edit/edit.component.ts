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
  selectedCategories: string[] = [];
  sectionTypes: string[] = [
    'html',
    'code',
    'media'
  ];


  constructor(
    private route: ActivatedRoute,
    private postalService: PostalService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {

    // Init Post
    this.getPostData();

    // Update Categories
    this.getCategories();
  }

  getPostData(){
    this.sub = this.route.params.subscribe( params => {
      this.postalService.getPostByID(params._id).subscribe( data => {
        this.post = data;
        if(data.category!==undefined){
          this.selectedCategories = data.category;
        }
      });
    });
  }

  addSection(){
    let defaultId = 'section'+this.post.body.length;
    this.post.body.push({
      type: 'code',
      id: defaultId,
      content: `
      // Default
          `,
      class: 'typescript'
    });

  }

  getCategories(){
    this.categoryService.getCategories().subscribe( data => {
      this.categories = data;
    });
  }

  editPost(){
    this.postalService.updatePost(this.post).subscribe( data => {
      this.getPostData();
    });
  }

  // Unsubscribe on leave
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
