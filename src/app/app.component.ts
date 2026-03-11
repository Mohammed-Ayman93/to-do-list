import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ToDoServices } from './services/todo.service';
import { IToDoItem } from './model/to-do-list.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',

})
export class App  {

    search = new FormControl('');
  toDo = inject(ToDoServices)
  @Input() toDoList = signal<IToDoItem []>([]);
  ngOnInit(): void {

    
    this.toDo.getData();
    this.search.valueChanges.subscribe(v=>{    
      this.toDoList.set(this.toDo.toDoListArr());
      let newArr =  this.toDoList().filter(d=> { return d.title.toLocaleLowerCase().includes(v?.toLocaleLowerCase() ?? '')})
      this.toDo.toDoListfillterd.set(newArr)
     })
  }
  showHideList(){
    this.toDo.showHideList();    
  }  
}
