import { Inject, Component, OnInit, Input, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from "@angular/forms";
import { MatDialogRef, MatDatepicker, MAT_DIALOG_DATA } from '@angular/material';
import { TasksService } from 'src/app/core/tasks.service';
import { ITask } from '../../shared/TaskInterface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-tasks-update',
    templateUrl: 'tasks-update.component.html',
    styleUrls: ['tasks-update.component.css']
})

export class TasksUpdateComponent implements OnInit{
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
    param;
    dateRegex;

    constructor(
        private tasksService: TasksService,
        private UpdateDialog: MatDialogRef<TasksUpdateComponent>,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){}

    ngOnInit(){
        
        //console.log(this.data.id);
        this.createForm(this.data.id);
    }

    createForm(id){
        this.tasksService.getTask(id).subscribe((Task: ITask) => {
            let duedate = Task.DueDate;
            console.log(duedate);

            let year = duedate.toString().substring(0, 4);
            let month = duedate.toString().substring(5, 7);
            let day = duedate.toString().substring(8, 10);

            let hour = duedate.toString().substring(11, 13);
            let min = duedate.toString().substring(14, 16);

            let date = month + '/' + day + '/' + year;
            let time = hour + ":" + min;

            console.log(hour);
            console.log(min);
            console.log(time);
            
            console.log(date);
            console.log(new Date(date));

            this.dateRegex = '^[0-9]{2}/[0-9]{2}/[0-9]{4}$'

            this.formGroup = new FormGroup({
                status: new FormControl('Open', Validators.required),
                quotetype: new FormControl(Task.QuoteType, Validators.required),
                tasktype: new FormControl(Task.TaskType, Validators.required),
                contact: new FormControl(Task.Contact, Validators.required),
                quotenumber: new FormControl(Task.QuoteNumber, Validators.required),
                duedate: new FormControl(new Date(date), [Validators.required/*, Validators.pattern(this.dateRegex)*/]),
                time: new FormControl(time, Validators.required),
                task: new FormControl(Task.TaskName, Validators.required)
              });
        });      
    }

    onCloseDialog(){
        this.UpdateDialog.close({data: 'test'});
        this.router.navigate(['tasks-list']);
    }

    getErrorQuoteNumber(){
        return this.formGroup.get('quotenumber').hasError('required') ? 'Field is required' :
            this.formGroup.get('quotenumber').hasError('pattern') ? 'Field must be a number' : '';
    }

    getErrorDate(){
        return this.formGroup.get('duedate').hasError('required') ? 'Field is required' :
            this.formGroup.get('duedate').hasError('pattern') ? 'Field must be a date' : '';
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

        if (hour < 5) hour = (hour - 5) + 24
        else hour = hour - 5

        let datetime = year + '-' + this.months[month] + '-' + day + 'T' + hour + ':' + minute;
        let d = new Date(datetime);

        task.QuoteNumber = Number(post.quotenumber);
        task.QuoteType = post.quotetype;
        task.Contact = post.contact;
        task.TaskName = post.task;
        task.TaskType = post.tasktype;
        task.DueDate = d;

        //console.log(task.DueDate);

        this.tasksService.UpdateTask(task, this.data.id).subscribe((response) => {
            //console.log(response);
            this.UpdateDialog.close({data: post});
            this.router.navigate(['tasks-list']);
        }); 
    }
}