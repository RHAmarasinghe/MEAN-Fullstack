import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentBlog: Blog = {
    title: '',
    description: '',
    published: false
  };
  
  message = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getBlog(this.route.snapshot.params["id"]);
    }
  }

  getBlog(id: string): void {
    this.blogService.get(id)
      .subscribe({
        next: (data) => {
          this.currentBlog = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentBlog.title,
      description: this.currentBlog.description,
      published: status
    };

    this.message = '';

    this.blogService.update(this.currentBlog.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentBlog.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateBlog(): void {
    this.message = '';

    this.blogService.update(this.currentBlog.id, this.currentBlog)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This blog was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteBlog(): void {
    this.blogService.delete(this.currentBlog.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/blogs']);
        },
        error: (e) => console.error(e)
      });
  }

}
