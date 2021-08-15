import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {combineLatest, Subscription} from 'rxjs';
import {LibraryData} from 'src/app/models/library';
import {AuthorsService} from 'src/app/services/authors.service';
import {GenresService} from 'src/app/services/genres.service';
import {ModalService} from 'src/app/services/modal.service';
import {BookService} from '../../../services/book.service';

@Component({
  selector: 'app-create-edit-data',
  templateUrl: './create-edit-data.component.html',
  styleUrls: ['./create-edit-data.component.scss']
})
export class CreateEditDataComponent implements OnInit, OnDestroy {
  @Input() pageName: string;
  public bookForm: FormGroup;
  private subscriptions: Subscription[] = [];
  public genres: LibraryData[] = [];
  public authors: LibraryData[] = [];
  public changeAuthor: LibraryData;
  public changeGenres: LibraryData;
  public id: string;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    public genresService: GenresService,
    public authorsService: AuthorsService,
    public bookService: BookService,
  ) {
  }

  @ViewChild('myModal', {static: false}) modal: ElementRef;


  ngOnInit(): void {
    this.bookForm = this.fb.group({
      bookName: ['', [Validators.required, Validators.minLength(2)]],
      genres: [null, [Validators.required]],
      author: [null, [Validators.required]],
      page: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
    this.dynamicForm();
    this.getDataById();
    this.getAll();
  }

  dynamicForm(): void {
    if (this.pageName === 'genres' || this.pageName === 'author') {
      this.formBook.bookName.clearValidators();
      this.formBook.page.clearValidators();
      this.formBook.date.clearValidators();
    }

    if (this.pageName === 'genres') {
      this.formBook.author.clearValidators();
      this.formBook.genres.setValidators(Validators.required);
    }

    if (this.pageName === 'author') {
      this.formBook.genres.clearValidators();
      this.formBook.author.setValidators(Validators.required);
    }

    this.formBook.bookName.updateValueAndValidity();
    this.formBook.page.updateValueAndValidity();
    this.formBook.date.updateValueAndValidity();
    this.formBook.author.updateValueAndValidity();
    this.formBook.genres.updateValueAndValidity();
  }

  getDataById(): void {
    const sb = this.modalService.subjectId.subscribe(id => {
      if (id) {
        this.id = id;
        this.modalService.getDataById(`/${this.pageName}`, id)
          .subscribe(res => {
            if (this.pageName === 'genres') {
              return this.formBook.genres.setValue(res?.genres);
            }
            if (this.pageName === 'author') {
              return this.formBook.author.setValue(res?.author);
            }
            this.formBook.bookName.setValue(res?.bookName);
            this.formBook.genres.setValue(res?.genres['id']);
            this.formBook.author.setValue(res?.author['id']);
            this.formBook.page.setValue(res?.page);
            this.formBook.date.setValue(res?.date);
          });
      }
    });
    this.subscriptions.push(sb);
  }

  getAll(): void {
    combineLatest([this.genresService.getGenresList(),
      this.authorsService.getAuthorsList(),
    ])
      .subscribe(([genres, authors]) => {
        this.genres = genres;
        this.authors = authors;
      });
  }

  checkNum(e: any): void {
    const value = e.target.value;
    e.target.value = value.replace(/\D/, '');
  }

  open() { // open modal
    this.modal.nativeElement.style.display = 'block';
  }

  close() { // close modal
    this.modal.nativeElement.style.display = 'none';
  }

  get formBook() {  // convenience getter for easy access to form fields
    return this.bookForm.controls;
  }

  changeAuthorValue(): void {
    this.changeAuthor = this.authors.filter(val => val.id === this.bookForm.value.author)[0];
  }

  changeGenresValue(): void {
    this.changeGenres = this.genres.filter(val => val.id === this.bookForm.value.genres)[0];
  }

  onSubmit(): void {

      if (this.bookForm.invalid) {
      return;
    }

    const data = this.bookForm.value;

    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }

    if (this.changeAuthor) {
      data.author = this.changeAuthor;
    }
    if (this.changeGenres) {
      data.genres = this.changeGenres;
    }
    if (this.id) {
      this.modalService.dataUptade(`/${this.pageName}/${this.id}`, data)
        .subscribe((res) => {
          if (this.pageName === 'genres') {
          const editedData = this.genresService.genresList.find(item => item.id === res.id);
          const index = this.genresService.genresList.indexOf(editedData);
            this.genresService.genresList[index] = res;
          } else if (this.pageName === 'author') {
            const editedData = this.authorsService.authorsList.find(item => item.id === res.id);
            const index = this.authorsService.authorsList.indexOf(editedData);
            this.authorsService.authorsList[index] = res;
          } else {
            const editedData = this.bookService.booksList.find(item => item.id === res.id);
            const index = this.bookService.booksList.indexOf(editedData);
            this.bookService.booksList[index] = res;
          }
          this.close();
          this.bookForm.reset();
        });
    } else {
      this.modalService.sendData(`/${this.pageName}`, data)
        .subscribe((res) => {
          this.modalService._items$.next(res);
          this.close();
          this.bookForm.reset();
        });
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
