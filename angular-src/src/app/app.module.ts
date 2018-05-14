// Module Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Component Imports
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditComponent } from './components/edit/edit.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { PostComponent } from './components/post/post.component';
import { SectionComponent } from './components/html/section.component';
import { MediaComponent } from './components/media/media.component';
import { FeatureComponent } from './components/feature/feature.component';

// Service Imports
import { AuthService } from './services/auth.service';
import { PostalService } from './services/postal.service';
import { CategoryService } from './services/category.service';
import { MediaService } from './services/media.service';

// Guard Imports
import { AuthGuard } from './guards/auth.guard';

// Pipes
import { HtmlPipe } from './pipes/html.pipe'

// Third Party Imports
import { HighlightModule } from 'ngx-highlightjs';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { JwtModule } from '@auth0/angular-jwt';

// Angular Routes
const appRoutes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'articles/:url', component: PostComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/edit/:_id', component: EditComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/media', component: MediaComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
]

const options = {
    theme: 'dracula'
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        LoginComponent,
        DashboardComponent,
        ArticlesComponent,
        PostComponent,
        EditComponent,
        SectionComponent,
        MediaComponent,
        HtmlPipe,
        FeatureComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        HighlightModule.forRoot(options),
        AngularFontAwesomeModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    let token = localStorage.getItem('id_token');
                    return token ? token : null;
                }
            }
        })
    ],
    providers: [
        AuthService,
        AuthGuard,
        PostalService,
        CategoryService,
        MediaService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
