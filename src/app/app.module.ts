import {
  inject,
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { App } from './app.component';
import { ToDoListCreateComponent } from './components/to-do-list/to-do-list-create/to-do-list-create.component';
import { ToDoListItemComponent } from './components/to-do-list/to-do-list-item/to-do-list-item.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ToDoServices } from './services/todo.service';

@NgModule({
  declarations: [
    App,
    ToDoListComponent,
    ToDoListItemComponent,
    ToDoListCreateComponent,
  ],
  imports: [BrowserModule, FormsModule,ReactiveFormsModule,
    RouterModule.forRoot([{
      path : '',
      component : ToDoListComponent
    },{
      path : "list-items",
      component : ToDoListComponent
    }
    ,{
      path : 'creat-item',
      component : ToDoListCreateComponent
    }
  ])
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
  bootstrap: [App],
})
export class AppModule {
  toDo = inject(ToDoServices);


}
