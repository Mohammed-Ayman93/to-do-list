import { Component, inject, Input } from '@angular/core';
import { IToDoItem } from '../../../model/to-do-list.model';
import { ToDoServices } from '../../../services/todo.service';

@Component({
  selector: 'app-to-do-list-item',
  standalone: false,
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.css',
  host : {
    class : "card-body d-flex m-2 bg-body-secondary gap-3 border border-2 border-dark rounded"
  }
})
export class ToDoListItemComponent  {
  toDOList = inject(ToDoServices);
 @Input() toDoItem !:IToDoItem;
  deletItem(){    
    const tempArr = [...this.toDOList.toDoListArr()]
    const newArr = this.toDOList.toDoListArr().filter(el=> el.id !== this.toDoItem.id);
    this.toDOList.toDoListfillterd.set(newArr);
    this.toDOList.deletItem(this.toDoItem.id).subscribe({
      error : ()=>{
        this.toDOList.toDoListfillterd.set(tempArr);
      }
    });
  }
  checkTask (){
    const checkIndex = this.toDOList.toDoListArr().findIndex(el=> el.id == this.toDoItem.id)
    const oldItem = {...this.toDOList.toDoListArr()[checkIndex]}
    this.toDOList.toDoListArr()[checkIndex].isChecked = !this.toDOList.toDoListArr()[checkIndex].isChecked;
    this.toDOList.updateCheck(this.toDoItem.id , this.toDoItem).subscribe({
      next : (d)=>{
        d  =  !this.toDoItem.isChecked        
      },
      error : ()=>{
        this.toDOList.toDoListArr()[checkIndex] = oldItem;
      }
    })
    
    
  }
}
