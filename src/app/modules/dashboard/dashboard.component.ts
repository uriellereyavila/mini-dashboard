import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, switchMap } from 'rxjs';
import { Book } from 'src/app/shared/models/books.model';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BookService } from 'src/app/shared/services/book.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ViewType } from 'src/app/shared/enums/view-type.enum';
import { SortBy } from 'src/app/shared/models/sort-by.model';
import { Sort } from 'src/app/shared/enums/sort.enum';
import { SortDirection } from 'src/app/shared/enums/sort-direction.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('toolbarAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('100ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  readonly Sort = Sort
  readonly SortDirection = SortDirection
  displayedColumns: string[] = ['content', 'dateCreated', 'image'];
  books$!: Observable<ResponseModel<Book>>;
  refreshBooks$ = new BehaviorSubject<boolean>(true);
  filterValue!: string;

  sort: SortBy = {
    property: Sort.CREATED_DATE,
    direction: SortDirection.ASCENDING
  }

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.books$ = this.refreshBooks$.pipe(switchMap(_ => {
      return this.bookService.getBooks()
        .pipe(
          map(books => {
            return {
              ...books,
              data: books.data
                .filter(this.filterData())
                .sort(this.sortData(this.sort.property, this.sort.direction))
            }
          }))
    }));
  }

  sortData(property: Sort, order: SortDirection) {
    return (a: Book, b: Book) => {
      const valueA = property === Sort.CREATED_DATE
        ? new Date(a.attributes.created_at)
        : a.attributes.content;
      const valueB = property === Sort.CREATED_DATE
        ? new Date(b.attributes.created_at)
        : b.attributes.content;

      if (order === SortDirection.ASCENDING) {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }

      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  }

  filterData() {
    return (book: Book) => {
      if (!this.filterValue) {
        return book;
      }

      return book.attributes.content
        .toLowerCase()
        .includes(this.filterValue.toLowerCase())
    }
  }

  onTextChange() {
    this.refreshData();
  }

  refreshData() {
    this.refreshBooks$.next(true);
  }

  onChangeProperty(data: Sort) {
    this.sort.property = data;
    this.refreshData();
  }

  toggleSortDirection() {
    this.sort.direction = this.sort.direction === SortDirection.ASCENDING ?
      SortDirection.DESCENDING :
      SortDirection.ASCENDING

    this.refreshData();
  }

  clearSearch() {
    if(this.filterValue) {
      this.filterValue = '';
      this.refreshData();
    }
  }

  onFilterKeyUp(event: any) {
    if(!event.target.value) {
      this.refreshData();
    }
  }
}
