import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/_services/blog.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';

//
@Component({
  selector: 'app-main-blogs-list',
  templateUrl: './main-blogs-list.component.html',
  styleUrls: ['./main-blogs-list.component.css']
})
export class MainBlogsListComponent implements OnInit {

  blogs?: Blog[];
  currentBlog: Blog = {};
  currentIndex = -1;
  title = '';
  content?: string;
  username?: string;
  isLoggedIn = true;

  constructor(private blogService: BlogService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.retrieveBlogs();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }
  }

  retrieveBlogs(): void {
    this.blogService.getAll()
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
