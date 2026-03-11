import { inject, Injectable, signal } from '@angular/core';
import { IToDoItem } from '../model/to-do-list.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoServices {
  http = inject(HttpClient);
  showHidden = signal(false);
  toDoListArr = signal<IToDoItem[]>([]);
  toDoListfillterd = signal<IToDoItem[]>([]);
  main = signal(false);
  getData(newItemAdded = false) {
    if (this.toDoListArr.length && !newItemAdded) return;
    this.http.get<IToDoItem[]>('https://69b0aeddc63dd197febcd9f6.mockapi.io/IToDoItem').subscribe({
      next: (data) => {
        this.toDoListArr.set(data);
        this.toDoListfillterd.set(data);
      },
    });
  }

  showHideList() {
    this.showHidden.set(!this.showHidden());
  }
  addNewTask(task: IToDoItem) {
    this.http.post('https://69b0aeddc63dd197febcd9f6.mockapi.io/IToDoItem', task).subscribe({
      complete: () => {
        this.getData(true);
      },
    });
  }
  deletItem(id: string): Observable<void> {
    return this.http.delete<void>(`https://69b0aeddc63dd197febcd9f6.mockapi.io/IToDoItem/${id}`);
  }
  updateCheck(id: string, item: IToDoItem) {
    return this.http.put('https://69b0aeddc63dd197febcd9f6.mockapi.io/IToDoItem/' + id, item);
  }
}
