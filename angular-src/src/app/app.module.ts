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

// Service Imports
import { AuthService } from './services/auth.service';
import { PostalService } from './services/postal.service';
import { ChunkService } from './services/chunk.service';

// Guard Imports
import { AuthGuard } from './guards/auth.guard';

// Third Party Imports
import { HighlightModule } from 'ngx-highlightjs';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { JwtModule } from '@auth0/angular-jwt';

// Angular Routes
const appRoutes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:url', component: PostComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'dashboard/:_id', component: EditComponent, canActivate:[AuthGuard] },
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
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    HighlightModule.forRoot(options),
    AngularFontAwesomeModule,
    InfiniteScrollModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          let token = localStorage.getItem('id_token');
          console.log(token);
          return token ? token : null;
        }
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    PostalService,
    ChunkService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
