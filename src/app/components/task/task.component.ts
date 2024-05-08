import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';





@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  providers: [ConfirmationService, MessageService]
})
export class TaskComponent implements OnInit{


  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }



  tasks: Task[] = this.taskService.getTasks();
  taskForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ){
     this.taskForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      completado: [false]
    });
  }


  taskNew!: Task ;





  removeTask(id: number) {

    this.confirmationService.confirm({
      message : 'seguro?',
      accept: () => {
        this.taskService.removeTask(id);

        this.tasks = this.taskService.getTasks();

        this.messageService.add({severity:'success', summary:'Success', detail:'Tarea eliminada exitosamente'});
      }
    })




  }


  addTask(){

    if (this.taskForm.valid) {
      const taskData = this.taskForm.value as Task;


      let maxId = 0;
      this.tasks.forEach(task => {
          if (task.id > maxId) {
              maxId = task.id;
          }
      });


      taskData.id = maxId + 1;


      this.taskService.addTask(taskData);
      this.taskForm.reset();
      this.tasks = this.taskService.getTasks();

      this.messageService.add({severity:'success', summary:'Success', detail:'Tarea agregada exitosamente'});
  }



  }


  editTask(id: number) {


    this.router.navigate(['/edit', id]);
  }

  viewTaskDetail(taskId: number) {

    this.router.navigate(['/detail', taskId]);
  }



}
