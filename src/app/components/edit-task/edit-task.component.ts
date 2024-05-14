import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId!: number;
  task: Task | undefined;
  taskForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la tarea a modificar
    this.taskId = +this.route.snapshot.params['id'];
    this.loadTask();
  }

  // Cargar los detalles de la tarea desde localStorage o desde el servicio
  loadTask(): void {
    const storedTasks = localStorage.getItem('tasks');
    let tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : this.taskService.getTasks();

    if (tasks.length === 0) {
      tasks = this.taskService.getTasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Encontrar la tarea con su ID
    this.task = tasks.find(task => task.id === this.taskId);

    if (this.task) {
      // Inicializar el formulario con los datos de la tarea
      this.taskForm = this.formBuilder.group({
        nombre: [this.task.nombre, Validators.required],
        completado: [this.task.completado]
      });
    } else {
      // si no se encuentra la tarea =>  Redirigir a la lista de tareas
      this.router.navigate(['/tasks']);
    }
  }

  // Editar la tarea
  editTask(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        id: this.taskId,
        nombre: this.taskForm.value.nombre,
        completado: this.taskForm.value.completado
      };

      this.taskService.updateTask(updatedTask);

      const storedTasks = localStorage.getItem('tasks');
      let tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
      const index = tasks.findIndex(task => task.id === this.taskId);

      if (index !== -1) {
        // Actualizar la tarea en localStorage
        tasks[index] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // mensaje de éxito
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarea editada exitosamente' });
        this.router.navigate(['/tasks']);
      } else {
        //si la tarea no se encuentra =>  mensaje de error
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Tarea no encontrada' });
      }
    }
  }
}
