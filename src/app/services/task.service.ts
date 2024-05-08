import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  private tasks: Task[] = [
    {id: 1, nombre: 'angular', completado: false},
    {id: 2, nombre: 'spring', completado: true},
    {id: 3, nombre: 'java', completado: true},
    {id: 4, nombre: 'fullstack project', completado: false},
    {id: 5, nombre: 'football 9PM', completado:true}

  ]


  getTasks(): Task[] {
    return this.tasks;
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }



  getTaskById(id: number ): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }


}
