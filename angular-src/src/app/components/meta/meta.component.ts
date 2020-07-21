import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../services/meta.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-meta',
    templateUrl: './meta.component.html',
    styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnInit {

    metaContent: string = '';

    constructor(
        private metaService: MetaService,
        private authservice: AuthService
    ) { }

    ngOnInit() {

        this.getMeta();

    }

    getMeta(): void {

        this.metaService.get().subscribe(data => {

            this.metaContent = JSON.stringify(data);

        });

    }

    updateMeta(): void {

        const meta = JSON.parse(this.metaContent);

        this.metaService.update(meta).subscribe(data => {

            console.log(data);

            this.getMeta();

        });

    }

}
