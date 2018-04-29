import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/media.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

    // Media
    media: Media[]

    constructor(

        private mediaService: MediaService

    ){}

    addMedia(){

        // TODO: Create Function
        console.log('Add Media');

    }

    parse(upload){

        return 'http://localhost:3000'+upload.substring(1);

    }

    ngOnInit(){

        this.mediaService.getAllMedia().subscribe((data: Media[]) => {

            this.media = data;

        });

    }

}