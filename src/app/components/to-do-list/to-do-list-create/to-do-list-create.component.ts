import { Component, inject, OnInit } from '@angular/core';
import { ToDoServices } from '../../../services/todo.service';
import { IToDoItem } from '../../../model/to-do-list.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list-create',
  standalone: false,
  templateUrl: './to-do-list-create.component.html',
  styleUrl: './to-do-list-create.component.css',
  host: {
    class: 'd-flex flex-column gap-3 justify-content-center align-items-center',
    style: 'height : 60vh  ',
  },
})
export class ToDoListCreateComponent implements OnInit {
  router = new Router()
  formGroup = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  });
  toDo = inject(ToDoServices);
  ngOnInit(): void {
        this.toDo.main.set(false);
  }
  addNewTask() {
    const description = this.formGroup;
    const title = this.formGroup;
    if(description.value.description == "" || title.value.title == ""){
      return;
    }
    const taskItem: IToDoItem = {
      date: new Date(),
      description : description.value.description! ,
      isChecked: false,
      title : title.value.title!,
      id: (Math.random() * new Date().getTime()).toString(),
    };
    this.toDo.addNewTask(taskItem);
    this.formGroup.setValue({
      title : '',
      description : ''
    })
    this.router.navigate(['list-items'])
  }
}
