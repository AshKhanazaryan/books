import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './views/authors/authors.component';
import { BooksComponent } from './views/books/books.component';
import { GenresComponent } from './views/genres/genres.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'genres'
  },
  {
    path: 'genres',
    component: GenresComponent
  },
  {
    path: 'author',
    component: AuthorsComponent
  },
  {
    path: 'book',
    component: BooksComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
