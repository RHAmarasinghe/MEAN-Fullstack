import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { MainBlogsListComponent } from './components/main-blogs-list/main-blogs-list.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';

const routes: Routes = [
  { path: '', redirectTo: 'mainblogs', pathMatch: 'full' },
  { path: 'blogs', component: BlogsListComponent },
  { path: 'blogs/:id', component: BlogDetailsComponent },
  { path: 'add', component: AddBlogComponent },
  { path: 'mainblogs', component: MainBlogsListComponent },
  { path: 'viewblog/:id', component: ViewBlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

