import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { ITask } from 'src/app/shared/TaskInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { TasksService } from 'src/app/core/tasks.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { TasksUpdateComponent } from '../tasks-update/tasks-update.component';
import { Router } from '@angular/router';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls:['./tasks-list.component.css']
})

export class TasksListComponent implements OnInit, AfterViewInit{
    constructor(private router: Router, private dialog: MatDialog, private tasksService: TasksService){}

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    //@ViewChild('AddDialog', {static: false}) AddDialog: TemplateRef<any>;
    
    UpdateDialog: MatDialogRef<TasksUpdateComponent>;
    ViewDialog: MatDialogRef<TasksViewComponent>;
    
    page: number = 1;
    pageNums: number;
    option = "Quote Number";
    checked = false;
    dataSource: MatTableDataSource<ITask>;

    ngOnInit(){
        this.getData();
        this.InitiatePaginator();
    }

    ngAfterViewInit(){
        this.AfterViewInitPaginate();
    }

    onPageChange(event){
        const prev = document.getElementsByClassName('mat-paginator-navigation-previous mat-icon-button mat-button-base');
        prev[0].innerHTML = 'Previous&emsp;';
        prev[0].append((event.pageIndex + 1).toString());

        const next = document.getElementsByClassName('mat-paginator-navigation-next mat-icon-button mat-button-base');
        next[0].innerHTML = '&emsp;Next';
    }

    ViewTask(id){
        this.OpenViewTask(id);
    }

    OpenUpdateTask(id){
        this.UpdateDialog = this.dialog.open(TasksUpdateComponent, {
            minHeight: '90vh',
            minWidth: '90vw',
            data: {
                id: id
            }
        });
        this.tasksService.pageIndex = this.paginator.pageIndex;
        this.router.navigate(['tasks-list/update-task', id])
    }

    OpenViewTask(id){
        this.ViewDialog = this.dialog.open(TasksViewComponent, {
            minHeight: '90vh',
            minWidth: '90vw',
            data: {
                id: id
            }
        });
        this.tasksService.pageIndex = this.paginator.pageIndex;
        this.router.navigate(['tasks-list/view-task', id]);
    }

    EditTask(id){
        this.OpenUpdateTask(id);
    }

    DeleteTask(id){
        let index = this.dataSource.data.findIndex(d => d.TaskID = id);
        this.dataSource.data.splice(index, 1);
        this.dataSource = new MatTableDataSource<ITask>(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.tasksService.DeleteTask(id).subscribe((response) => console.log(response));
    }

    getSelected(values){
        //debugger;
        let prop = "";
        if (values.option == 'Task') prop = "TaskName";
        else prop = values.option.split(' ').join('').trim();
        if (values.checked == false){
    
            const sortState: Sort = {active: prop, direction: 'asc'};
            this.sort.active = sortState.active;
            this.sort.direction = sortState.direction;
            this.sort.sortChange.emit(sortState);
            
            console.log(prop);
            console.log(values.checked);
        }
        if (values.checked == true) {

            const sortState: Sort = {active: prop, direction: 'desc'};
            this.sort.active = sortState.active;
            this.sort.direction = sortState.direction;
            this.sort.sortChange.emit(sortState);

            //console.log(prop);
            //console.log(values.checked);
        }
    }

    getSearch(value){
        this.dataSource.filter = value.trim().toLowerCase();
        console.log(this.dataSource.filter)
        console.log(value);
    }

    InitiatePaginator(){
        if (this.paginator){
            const prev = document.getElementsByClassName('mat-paginator-navigation-previous mat-icon-button mat-button-base');
            prev[0].innerHTML = 'Previous&emsp;';
    
            prev[0].append((this.tasksService.pageIndex + 1).toString());
    
            const next = document.getElementsByClassName('mat-paginator-navigation-next mat-icon-button mat-button-base');
            next[0].innerHTML = '&emsp;Next';
    
            const pageShowing = document.getElementsByClassName('mat-paginator-range-label');
            pageShowing[0].prepend('Showing' + ' ');
            pageShowing[0].append(' ' + 'entries');
        }
    }

    AfterViewInitPaginate(){
        if (this.paginator){
            const preEntries = document.getElementsByClassName('mat-paginator-page-size-label');
            preEntries[0].innerHTML = 'Show:&emsp;';
    
            const postEntriesText = document.createElement('p');
            postEntriesText.id = 'entriesText';
            postEntriesText.innerHTML = '&emsp;entries';
    
            const Entries = document.getElementsByClassName('mat-paginator-page-size ng-star-inserted');
            if (Entries[0] != null){
                if(document.getElementById('entriesText') == null)
                Entries[0].append(postEntriesText);
            }
        }        
    }

    getData(){
        this.tasksService.getTasks().subscribe((Tasks: ITask[]) => {
            this.dataSource = new MatTableDataSource<ITask>(Tasks);
            this.dataSource.paginator = this.paginator;
            //debugger;
            this.dataSource.sortingDataAccessor = (item, property) => {
                //debugger;
                 switch (property) {
                    case 'TaskName': return item.TaskName.trim().toLowerCase().split(' ').join('');
                    case 'Contact': return item.Contact.trim().toLowerCase().split(' ').join('');
                    case 'QuoteType': return item.QuoteType.trim().toLowerCase().split(' ').join('');
                    case 'TaskType': return item.TaskType.trim().toLowerCase().split(' ').join('');
                    default: return item[property];
                 }
            };
            this.paginator.pageIndex = this.tasksService.pageIndex; 
            this.dataSource.sort = this.sort;
        }, error => {
            if (error.status == 401 && localStorage.getItem("Token") != null) this.router.navigate(['../', 'login']);
            //router.navigate(['../', 'login']);
        });
    }

    displayedColumns: string[] = ['QuoteType', 'QuoteNumber', 'Contact', 'TaskName', 'DueDate', 'TaskType', 'Options'];
    
}