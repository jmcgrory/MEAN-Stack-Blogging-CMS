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
    fileToUpload: File = null;

    constructor(

        private mediaService: MediaService

    ) { }

    handleFileInput(files: FileList) {

        this.fileToUpload = files.item(0);

    }

    addMedia() {

        if (this.fileToUpload === undefined) {

            console.log('No Media');

            return false;

        }

        this.mediaService.upload(this.fileToUpload).subscribe(data => {

            this.getAllMedia();

        });

    }

    delete(path: string) {

        this.mediaService.delete(path).subscribe(data => {

            this.getAllMedia();

        });

    }

    parse(upload: string) {

        return 'http://localhost:3000' + upload.substring(1);

    }

    ngOnInit() {

        this.getAllMedia();

    }

    getAllMedia() {

        this.mediaService.getAllMedia().subscribe((data: Media[]) => {

            this.media = data;

        });

    }

}