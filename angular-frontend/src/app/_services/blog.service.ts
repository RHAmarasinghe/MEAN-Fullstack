import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';

const baseUrl = 'http://localhost:8080/api/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }


  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(baseUrl);
  }

  get(id: any): Observable<Blog> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${baseUrl}?title=${title}`);
  }

  findByAuthor(author: any): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${baseUrl}?author=${author}`);
  }

  getAllPublised(published: true): Observable<Blog[]> {
    return this.http.get<Blog[]>(baseUrl);
  }
}

