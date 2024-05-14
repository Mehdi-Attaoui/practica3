import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {

    // formulario con validacion
    this.taskForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      completado: [false]
    });
  }

  ngOnInit(): void {

    // Cargar tareas desde localStorage al iniciar el componente

    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      if (this.tasks.length === 0) {
        this.initializeTasksFromService();
      }
    } else {
      this.initializeTasksFromService();
    }
  }

  // Inicializar tareas desde el servicio y almacenarlas en localStorage

  initializeTasksFromService(): void {
    this.tasks = this.taskService.getTasks();
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Agregar una nueva tarea

  addTask(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value as Task;

      // incrementar la id con 1
      const maxId = this.tasks.reduce((max, task) => task.id > max ? task.id : max, 0);
      taskData.id = maxId + 1;

      this.taskService.addTask(taskData);
      this.tasks = this.taskService.getTasks();
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      // Mostrar mensaje de exito
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarea agregada exitosamente' });
    }
  }

  // Eliminar una tarea

  removeTask(id: number): void {
    this.confirmationService.confirm({
      message: '¿Seguro?',
      accept: () => {
        this.taskService.removeTask(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));

        // Mostrar mensaje de éxito
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarea eliminada exitosamente' });
      }
    });
  }

  // Editar una tarea existente (navegar a la vista de edición)
  editTask(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  // Ver detalles de una tarea con 'id'
  viewTaskDetail(taskId: number): void {
    this.router.navigate(['/detail', taskId]);
  }
}
