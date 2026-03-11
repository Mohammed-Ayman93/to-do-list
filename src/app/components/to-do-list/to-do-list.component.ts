import { Component, inject, OnInit } from '@angular/core';
import { ToDoServices } from '../../services/todo.service';

@Component({
  selector: 'app-to-do-list',
  standalone: false,
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
  host: {
    class: 'card shadow-sm border-0 mb-3 w-75 m-auto bg-body-tertiary',
  },
})
export class ToDoListComponent implements OnInit {
  toDo = inject(ToDoServices);
  ngOnInit(): void {
    this.toDo.main.set(true)
    this.toDo.getData();      
  }
}
