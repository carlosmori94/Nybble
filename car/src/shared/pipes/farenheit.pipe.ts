import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'farenheit'
})
export class FarenheitPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return Math.trunc(value).toString() + '° Farenheit';
  }

}
