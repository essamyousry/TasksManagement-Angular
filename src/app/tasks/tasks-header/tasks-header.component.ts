import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { TasksAddComponent } from '../tasks-add/tasks-add.component'
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tasks-header',
    templateUrl: 'tasks-header.component.html',
    styleUrls: ['tasks-header.component.css']
})

export class TasksHeaderComponent implements OnInit{

    AddDialog: MatDialogRef<TasksAddComponent>;

    constructor(
        private router: Router, 
        private dialog: MatDialog
    ){}

    ngOnInit(){
        
    }

    AddTask(){
        this.AddDialog = this.dialog.open(TasksAddComponent, {
            minHeight: '90vh',
            minWidth: '90vw'
        });
        this.router.navigate(['tasks-list/add-task']);
    }

    Logout(){
        localStorage.setItem("Token", null);
        localStorage.setItem("User", null);
        this.router.navigate(['../', 'login']);
    }

}