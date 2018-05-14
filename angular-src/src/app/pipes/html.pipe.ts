import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'Html' })
export class HtmlPipe implements PipeTransform {

    constructor(

        private sanitized: DomSanitizer

    ) { }

    transform(value: string): SafeHtml {

        return this.sanitized.bypassSecurityTrustHtml(value);

    }

}