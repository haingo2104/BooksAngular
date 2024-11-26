import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  templateUrl: './book-detail.component.html',
  imports : [CommonModule],
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() bookId: string = '';      
  bookDetails: Book | null = null;   
  
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    if (this.bookId) {
      this.fetchBookDetails(this.bookId);
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookId'] && changes['bookId'].currentValue) {
      this.fetchBookDetails(changes['bookId'].currentValue);
    }
  }

  fetchBookDetails(bookId: string): void {
    this.booksService.getBookDetails(bookId).subscribe(details => {
      this.bookDetails = details;
    });
  }
}

