import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksHeaderComponent } from './tasks-header/tasks-header.component';
import { TasksFilterComponent } from './tasks-filter/tasks-filter.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../shared/shared.module';
import { TasksAddComponent } from './tasks-add/tasks-add.component';
import { AppRoutingModule } from '../routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatFormFieldModule, MatTabsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { TasksUpdateComponent } from './tasks-update/tasks-update.component';
import { TasksViewComponent } from './tasks-view/tasks-view.component';

@NgModule({
    declarations: [TasksComponent, TasksListComponent, TasksHeaderComponent, TasksFilterComponent, TasksAddComponent, TasksUpdateComponent, TasksViewComponent],
    imports: [ 
        CommonModule,
        MatPaginatorModule, 
        MatTableModule, 
        MatSortModule, 
        SharedModule, 
        AppRoutingModule, 
        ReactiveFormsModule, 
        MatIconModule, 
        MatDialogModule, 
        MatFormFieldModule, 
        MatTabsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatOptionModule,
        MatSelectModule
    ],
        entryComponents: [TasksUpdateComponent, TasksAddComponent, TasksViewComponent],
        exports: [TasksComponent, TasksListComponent, TasksHeaderComponent, TasksFilterComponent, TasksAddComponent, TasksUpdateComponent, TasksViewComponent]
    })

export class TasksModule{
    
}