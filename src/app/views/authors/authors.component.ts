import {Component, OnInit, ViewChild} from '@angular/core';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {LibraryData} from 'src/app/models/library';
import {AuthorsService} from 'src/app/services/authors.service';
import {ModalService} from 'src/app/services/modal.service';
import {CreateEditDataComponent} from '../modal/create-edit-data/create-edit-data.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  public loader: boolean = false;

  constructor(
    public authorService: AuthorsService,
    private modalService: ModalService) {
  }

  @ViewChild('modal', {static: false}) modal: CreateEditDataComponent;

  openModal() {
    this.modal.open();
  }

  ngOnInit(): void {
    this.allAuthors();
  }

  allAuthors(): void {
    this.authorService.getAuthorsList()
      .subscribe(res => {
        this.loader = true;
        this.authorService.authorsList = res;
      });
  }

  sendId(id: string): void {
    this.modalService.sendDataId(id);
    this.modal.open();
  }

  delete(id: string): void {
    this.authorService.deleteAuthor(id)
      .subscribe(res => {
        this.loader = true;
        this.authorService.authorsList = this.authorService.authorsList.filter(val => val.id !== id);
      });
  }

}
