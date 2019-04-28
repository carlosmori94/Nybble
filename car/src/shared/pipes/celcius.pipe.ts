import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celcius'
})
export class CelciusPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return Math.trunc(value).toString() + '° Celcius';
  }

}
