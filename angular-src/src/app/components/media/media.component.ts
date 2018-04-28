import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/media.model';

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

    ngOnInit(){

        this.mediaService.getAllMedia().subscribe((data: Media[]) => {

            this.media = data;

            console.log(this.media);

        });

    }

}