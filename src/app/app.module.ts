import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';
import { MainBlogsListComponent } from './components/main-blogs-list/main-blogs-list.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';


@NgModule({
  declarations: [
    AppComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
