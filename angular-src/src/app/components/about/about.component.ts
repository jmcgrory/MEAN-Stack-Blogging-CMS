import { Component } from '@angular/core';
import { Skill } from '../../models/skill.model';

@Component({

    selector: 'app-about',

    templateUrl: './about.component.html'

})
export class AboutComponent {

    constructor() {}

    snippet: string = `
        export Jamie = new Person({
            age: 26,
            interests: [
                'Surfing',
                'Motorcycles',
                'Coffee',
                'Camping',
                'Design',
                'Development'
            ]
        })
    `;

    skills: Object[] = [

        {

            name: 'Javascript (ES5/ES6)',

            level: 75

        },

		{

            name: 'CSS3/SCSS',

            level: 95

        },

		{

            name: 'HTML5',

            level: 95

        },

		{

            name: 'Angular (2+)',

            level: 72

        },

		{

            name: 'AngularJS',

            level: 76

        },

		{

            name: 'NodeJS',

            level: 65

        },

		{

            name: 'React',

            level: 30

        },

		{

            name: 'PHP 7+',

            level: 60

        },

		{

            name: 'Laravel 5.6+',

            level: 40

        },

		{

            name: 'ExpressJS',

            level: 45

        },

		{

            name: 'MongoDB',

            level: 35

        },

		{

            name: 'MySQL/SQL',

            level: 40

        },

		{

            name: 'Typescript',

            level: 70

        },

		{

            name: 'C++',

            level: 26

        },

		{

            name: 'Adobe Photoshop',

            level: 90

        },

		{

            name: 'Adobe Illustrator',

            level: 95

        },

		{

            name: 'Adobe AfterEffects',

            level: 65

        },

		{

            name: 'Adobe InDesign',

            level: 60

        },

		{

            name: 'Adobe XD',

            level: 45

        },

		{

            name: 'Adobe Premiere Pro',

            level: 35

        },

		{

            name: 'Google Analytics',

            level: 55

        },

		{

            name: 'Google Tag Manager',

            level: 65

        },

		{
            
            name: 'SEO Screaming Frog',

            level: 50

        }
        
    ];

}
