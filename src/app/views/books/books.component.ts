import { Component, OnInit, ViewChild } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LibraryData } from 'src/app/models/library';
import { BookService } from 'src/app/services/book.service';
import { ModalService } from 'src/app/services/modal.service';
import { CreateEditDataComponent } from '../modal/create-edit-data/create-edit-data.component';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  public loader: boolean = false;
  constructor(
              public bookService: BookService,
              public modalService: ModalService) { }
  @ViewChild('modal', {static: false}) modal: CreateEditDataComponent

  openModal() {
    this.modal.open();
  }
  ngOnInit(): void {
    this.allBooks();

    this.modalService.items$.subscribe(res => {
      if (res) {
        this.bookService.booksList.push(res);
      }
    })
  }

  allBooks(): void {
    this.bookService.getBooksList()
    .subscribe(res => {
      this.loader = true;
      this.bookService.booksList = res;
    });
  }

  sendId(id: string): void {
    this.modalService.sendDataId(id)
    this.modal.open();
  }

  delete(id: string): void {
    this.bookService.deleteBook(id)
    .subscribe(res => {
    this.loader = true;
    this.bookService.booksList = this.bookService.booksList.filter( val => val.id !== id);
   });
}

}
