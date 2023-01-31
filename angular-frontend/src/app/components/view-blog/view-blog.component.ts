import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {


  currentBlog: Blog = {
    title: '',
    description: '',
    author: '',
    updatedAt: '',
    published: false
  };
  
  message = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
      this.getBlog(this.route.snapshot.params["id"]);
    
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

}
