import { NgModule } from '@angular/core';
import { DateConvertPipe } from './date.pipe';
import { CapitalizePipe } from './capitalize.pipe';

//components, directives and pipes go in declarations
@NgModule({
    declarations: [ DateConvertPipe, CapitalizePipe ],
    exports: [ DateConvertPipe, CapitalizePipe ]
})
export class SharedModule { }