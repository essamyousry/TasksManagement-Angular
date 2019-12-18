import { Inject, Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from "@angular/forms";
import { MatDialogRef, MatDatepicker, MAT_DIALOG_DATA } from '@angular/material';
import { TasksService } from 'src/app/core/tasks.service';
import { ITask } from '../../shared/TaskInterface';
import { Router, ActivatedRoute } from '@angular/router';
import { DateConvertPipe } from '../../shared/date.pipe'

@Component({
    selector: 'app-tasks-view',
    templateUrl: 'tasks-view.component.html',
    styleUrls: ['tasks-view.component.css']
})

export class TasksViewComponent implements OnInit{

    TaskID;
    TaskName;
    TaskType;
    QuoteNumber;
    QuoteType;
    Contact;
    DueDate;

    constructor(
        private tasksService: TasksService,
        private ViewDialog: MatDialogRef<TasksViewComponent>,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){}

    ngOnInit(){
        this.tasksService.getTask(this.data.id).subscribe((Task: ITask) => {
            this.TaskID = Task.TaskID;
            this.TaskName = Task.TaskName;
            this.TaskType = Task.TaskType;
            this.QuoteNumber = Task.QuoteNumber;
            this.QuoteType = Task.QuoteType;
            this.Contact = Task.Contact;
            this.DueDate = Task.DueDate;
        })
    }

    onCloseDialog(){
        this.ViewDialog.close();
        this.router.navigate(['tasks-list']);
    }
}