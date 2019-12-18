import { Inject, Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from "@angular/forms";
import { MatDialogRef, MatDatepicker } from '@angular/material';
import { TasksService } from 'src/app/core/tasks.service';
import { ITask } from '../../shared/TaskInterface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tasks-add',
    templateUrl: 'tasks-add.component.html',
    styleUrls: ['tasks-add.component.css']
})

export class TasksAddComponent implements OnInit{

    LastID: number;
    months = {
        'Jan': '01',
        'Feb': '02',
        'Mar': '03',
        'Apr': '04',
        'May': '05',
        'Jun': '06',
        'Jul': '07',
        'Aug': '08',
        'Sep': '09',
        'Oct': '10',
        'Nov': '11',
        'Dec': '12'
    };
    
    formGroup: FormGroup;
    post: any = '';
    alertTitle = 'This Field is required';

    constructor(
        private taskService: TasksService,
        private formBuilder: FormBuilder,
        private AddDialog: MatDialogRef<TasksAddComponent>,
        private router: Router,
    ){}

    ngOnInit(){
        this.createForm();
    }

    createForm(){
        this.formGroup = this.formBuilder.group({
            'quotetype': ['', Validators.required],
            'tasktype': ['', Validators.required],
            'contact': ['', Validators.required],
            'quotenumber': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            'duedate': ['', Validators.required],
            'time': ['', Validators.required],
            'task': ['', Validators.required]
        })
    }

    onCloseDialog(){
        this.AddDialog.close();
        this.router.navigate(['tasks-list']);
    }

    getErrorQuoteNumber(){
        return this.formGroup.get('quotenumber').hasError('required') ? 'Field is required' :
            this.formGroup.get('quotenumber').hasError('pattern') ? 'Field must be a number' : '';
    }

    onSubmit(post){
        let task = <ITask>{};

        let duedate = post.duedate.toString();
        let time = post.time;

        let hour = time.substring(0, 2);
        if(hour.length == 1) hour = '0' + hour;
        let minute = time.substring(3, 5);

        let month = duedate.substring(4, 7);
        let day = duedate.substring(8, 10);
        let year = duedate.substring(11, 15);

        let datetime = year + '-' + this.months[month] + '-' + day + 'T' + hour + ':' + minute;
        let d = new Date(datetime);

        task.QuoteNumber = Number(post.quotenumber);
        task.QuoteType = post.quotetype;
        task.Contact = post.contact;
        task.TaskName = post.task;
        task.TaskType = post.tasktype;
        task.DueDate = d;

        this.taskService.getTasks().subscribe((Tasks: ITask[]) => {
            this.taskService.pageIndex = Math.ceil((Tasks.length - 1) / 5);
            this.LastID = Tasks[Tasks.length - 1].TaskID;
            task.TaskID = ++this.LastID;
            this.taskService.AddTask(task).subscribe((response) => {
                console.log(response);
                this.AddDialog.close({data: post});
                this.router.navigate(['tasks-list']);
            });
        });
    }
}