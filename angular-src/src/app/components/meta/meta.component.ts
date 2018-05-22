import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../services/meta.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-meta',
    templateUrl: './meta.component.html',
    styleUrls: ['./meta.component.css']
})
export class MetaComponent implements OnInit {

    metaContent: string = '';

    constructor(
        private metaService: MetaService,
        private authservice: AuthService
    ) { }

    ngOnInit() {

        this.metaService.get().subscribe(data => {

            this.metaContent = JSON.stringify(data);

        })

    }

    update(): void {

        console.log(this.metaContent);

    }

}
