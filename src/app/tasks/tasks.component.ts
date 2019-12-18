import { Component, OnInit } from '@angular/core';
import { ITask } from '../shared/TaskInterface';
import { TasksService } from '../core/tasks.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

}
