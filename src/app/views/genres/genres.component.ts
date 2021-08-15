import {Component, OnInit, ViewChild} from '@angular/core';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {LibraryData} from 'src/app/models/library';
import {GenresService} from 'src/app/services/genres.service';
import {ModalService} from 'src/app/services/modal.service';
import {CreateEditDataComponent} from '../modal/create-edit-data/create-edit-data.component';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  public loader: boolean = false;


  constructor(
    public genresService: GenresService,
    public modalService: ModalService) {
  }

  @ViewChild('modal', {static: false}) modal: CreateEditDataComponent;

  ngOnInit(): void {
    this.allGenres();

    this.modalService.items$.subscribe(res => {

      if (res) {
        this.genresService.genresList.push(res);
      }
    })
  };

  allGenres(): void {
    this.genresService.getGenresList()
      .subscribe(res => {
        this.loader = true;
        this.genresService.genresList = res;
      });
  }

  openModal() {
    this.modal.open();
  }

  sendId(id: string): void {
    this.modalService.sendDataId(id);
    this.modal.open();
  }

  delete(id: string): void {
    this.genresService.deleteGenres(id)
      .subscribe(res => {
        this.loader = true;
        this.genresService.genresList = this.genresService.genresList.filter(val => val.id !== id);
      });
  }

}
