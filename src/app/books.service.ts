import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  apiUrl = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) {}

  getBooks(page: number, limit: number): Observable<{ books: Book[], totalBooks: number }> {
    return this.http.get<{ books: Book[], totalBooks: number }>(`${this.apiUrl}/${page}/${limit}`);
  }

  getBookDetails(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${bookId}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }
}
