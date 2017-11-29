import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostalService } from '../../services/postal.service';
import { Feature } from '../../models/feature.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  featured: Feature;

  constructor(
    private postalService: PostalService
  ) {}

  ngOnInit() {
    this.postalService.getFeatured().subscribe( data => {
      this.featured = data;
    });
  }

}
