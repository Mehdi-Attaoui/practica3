import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, nombre: 'Angular', completado: false },
    { id: 2, nombre: 'Spring', completado: true },
    { id: 3, nombre: 'full stack', completado: false },
    { id: 4, nombre: 'java', completado: true }
  ];

  // Obtener todas las tareas
  getTasks(): Task[] {
    return this.tasks;
  }

  // Obtener una tarea por su ID
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  // Agregar una nueva tarea
  addTask(task: Task): void {
    this.tasks.push(task);
  }

  // Eliminar una tarea por su ID
  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  // Actualizar una tarea
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }
}
