import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDataComponent } from './user-data/user-data.component';
import { DeleteComponentComponent } from './delete-component/delete-component.component';
import { HighlighterDirective } from './highlighter.directive';
import { ErrorhighlighterDirective } from './errorhighlighter.directive';
import { EditErrohighlighterDirective } from './edit-errohighlighter.directive';
import { CustomePipePipe } from './custome-pipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { LocalDataService } from 'src/app/local-data.service';

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    DeleteComponentComponent,
    HighlighterDirective,
    ErrorhighlighterDirective,
    EditErrohighlighterDirective,
    CustomePipePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LocalDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
