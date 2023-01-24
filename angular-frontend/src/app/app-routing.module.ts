import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

import { BlogsListComponent } from './components/blogs-list/blogs-list.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { MainBlogsListComponent } from './components/main-blogs-list/main-blogs-list.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
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
