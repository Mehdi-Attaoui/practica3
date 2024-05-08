import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskDetailComponent,
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    ToastModule,
    ButtonModule,
    MessagesModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule

  ],
  providers: [ConfirmationService,MessageService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
