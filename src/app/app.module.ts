import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainModule} from './components/main.module';
import {CommonModule} from '@angular/common';
import { BooksComponent } from './views/books/books.component';
import { AuthorsComponent } from './views/authors/authors.component';
import { GenresComponent } from './views/genres/genres.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateEditDataComponent } from './views/modal/create-edit-data/create-edit-data.component';
import { LoaderComponent } from './shared/loader/loader.component';



@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorsComponent,
    GenresComponent,
    CreateEditDataComponent,
    LoaderComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MainModule,
    FontAwesomeModule,
    CommonModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [

  ]
})
export class AppModule { }
