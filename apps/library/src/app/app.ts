import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksService } from '@data-access/books-service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly booksService = inject(BooksService);

  ngOnInit() {
    this.booksService.getBooks().then((books) => {
      console.log('Books:', books);
    });
  }
}
