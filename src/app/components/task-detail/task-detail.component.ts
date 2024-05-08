import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  task?: Task;
  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {

    const taskId = +this.route.snapshot.params['id'];
    this.task = this.taskService.getTaskById(taskId);

  }

}
