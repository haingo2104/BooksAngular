import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';
import { Book } from '../book';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  @Output() refreshPage = new EventEmitter<void>();
  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    publicationYear: new FormControl('')
  });

  successMessageVisible = false; 

  constructor(private bookService: BooksService, private router: Router) {}

  handleSubmit() {
    const book: Book = {
      title: this.bookForm.value.title as string,
      author: this.bookForm.value.author as string,
      publicationYear: this.bookForm.value.publicationYear as string
    };

    this.bookService.addBook(book).subscribe({
      next: () => {
        
        this.successMessageVisible = true;

        setTimeout(() => {
          this.successMessageVisible = false;
        }, 2000);
        this.refreshPage.emit();
        this.bookForm.reset();
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout du livre:', err);
      }
    });
  }

  // navigateToLastPage() {
  //   this.bookService.getBooks(1, 10).subscribe(({ totalBooks }) => {
  //     const lastPage = Math.ceil(totalBooks / 10);
  //     this.router.navigate(['/books', { page: lastPage }]); 
  //   });
  // }
}
