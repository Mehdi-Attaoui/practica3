import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  taskId!: string;
  task: Task|undefined;
  taskForm!: FormGroup;

  constructor( private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private messageService: MessageService,) {

  }

  ngOnInit(): void
   {
    const taskId = +this.route.snapshot.params['id'];

    this.task = this.taskService.getTaskById(taskId);

    if (!this.task) {
      const storedTask = localStorage.getItem('editedTask');
      if (storedTask) {
        this.task = JSON.parse(storedTask);
      } else {
        this.router.navigate(['/tasks']);
        return;
      }
    }

    this.taskForm = this.formBuilder.group({
      nombre: [this.task!.nombre],
      completado: [this.task!.completado]
    });
  }

  editTask(): void {
    const taskId = +this.route.snapshot.params['id'];
    const updatedTask: Task = {
      id: taskId,
      nombre: this.taskForm.value.nombre,
      completado: this.taskForm.value.completado
    };
    this.taskService.updateTask(updatedTask);

    localStorage.setItem('editedTask', JSON.stringify(updatedTask));

    this.messageService.add({severity:'success', summary:'Success', detail:'Editing successful'});

  }

}
