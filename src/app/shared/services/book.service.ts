import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/books.model';
import { ResponseModel } from '../models/response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<ResponseModel<Book>> {
    return this.http.get<ResponseModel<Book>>('assets/books.json');
  }
}
