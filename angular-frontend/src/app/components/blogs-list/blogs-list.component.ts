import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/_services/blog.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit {

  blogs?: Blog[];
  currentBlog: Blog = {};
  currentIndex = -1;
  title = '';
  author ='';
  username?: string ;
  isLoggedIn = true;

  constructor(
    private blogService: BlogService,
    private storageService: StorageService
    ) { }

  ngOnInit(): void {
      const user = this.storageService.getUser();
      this.username = user.username;
      this.retrieveBlogs();
  }

  retrieveBlogs(): void {
    this.currentBlog = {};
    this.currentIndex = -1;

    this.blogService.findByAuthor(this.username)
      .subscribe({
        next: (data) => {
          this.blogs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveBlogs();
    this.currentBlog = {};
    this.currentIndex = -1;
  }

  setActiveBlog(blog: Blog, index: number): void {
    this.currentBlog = blog;
    this.currentIndex = index;
  }

  removeAllBlogs(): void {
    this.blogService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentBlog = {};
    this.currentIndex = -1;

    this.blogService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.blogs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


}