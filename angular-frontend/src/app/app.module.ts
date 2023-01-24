import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';
import { MainBlogsListComponent } from './components/main-blogs-list/main-blogs-list.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,

    AddBlogComponent,
    BlogDetailsComponent,
    BlogsListComponent,
    MainBlogsListComponent,
    ViewBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
