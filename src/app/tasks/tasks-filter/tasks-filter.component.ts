import { Component, Output, EventEmitter} from '@angular/core';
import { ITask } from 'src/app/shared/TaskInterface';

@Component({
    selector: 'app-tasks-filter',
    templateUrl: 'tasks-filter.component.html',
    styleUrls: ['tasks-filter.component.css']
})

export class TasksFilterComponent{
    
    options: string[] = ['Quote Number', 'Quote Type', 'Contact', 'Task', 'Due Date', 'Task Type'];
    checked = false;
    option = 'Quote Number';
    searchValue = '';

    getSelected(value?){
        if (value){
            this.option = value;
        }
        else {
            this.checked = !this.checked;
        }

        this.valueChange.emit({option: this.option, checked: this.checked});
    }

    getSearch(searchValue){
        this.searchChange.emit(searchValue);
    }

    @Output() valueChange = new EventEmitter();
    @Output() searchChange = new EventEmitter();
    
}