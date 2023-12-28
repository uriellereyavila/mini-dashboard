import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/shared/models/books.model';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  books$!: Observable<ResponseModel<Book>>;

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks();
  }

}
