import { Component } from '@angular/core';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/_services/blog.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
    username?: string;
    isLoggedIn = true;

    ngOnInit(): void {
      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.username = user.username;
      }
    }

  blog: Blog = {
    title: '',
    author: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(
    private blogService: BlogService,
    private storageService: StorageService
    ) { }

  saveBlog(): void {
    const data = {
      title: this.blog.title,
      author: this.username,
      description: this.blog.description
    };

    this.blogService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newBlog(): void {
    this.submitted = false;
    this.blog = {
      title: '',
      author: this.username,
      description: '',
      published: false
    };
  }
}
