import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DateConvert' })
export class DateConvertPipe implements PipeTransform {
    transform(value: any) {
        if (value) {
            let year = value.substring(0, 4);
            let month = value.substring(5, 7);
            let day = value.substring(8, 10);
            let hour = value.substring(11, 13);
            let min = value.substring(14, 16);

            return month + '/' + day + '/' + year + ' ' + hour + ':' + min;  
        }
        return value;
    }
}