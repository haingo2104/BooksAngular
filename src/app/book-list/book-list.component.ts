import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../book';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  imports : [CommonModule,BookDetailComponent],
  styleUrls: ['./book-list.component.css'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];              
  totalBooks: number = 0;
  currentPage: number = 1;
  limit: number = 5;
  selectedBookId: string | null = null;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(page: number = this.currentPage): void {
    this.booksService.getBooks(page, this.limit).subscribe(response => {
      console.log('API Response:' , response);
      this.books = response.books as Book[]; 
      this.totalBooks = response.totalBooks;
    });
  }

  changePage(offset: number): void {
    const newPage = this.currentPage + offset;
    const totalPages = this.totalPages;  

    if (newPage >= 1 && newPage <= totalPages) {
      this.currentPage = newPage;
      this.loadBooks();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalBooks / this.limit);
  }

  selectBook(bookId: string): void {
    if (!bookId) {
      console.error('Invalid book ID');
      return;
    }
    
    if (this.selectedBookId === bookId) {
      this.selectedBookId = ''; 
    } else {
      this.selectedBookId = bookId; 
    }
  
    console.log("Selected book ID:", this.selectedBookId);
  }

}
