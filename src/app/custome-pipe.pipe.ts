import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customePipe'
})
export class CustomePipePipe implements PipeTransform {

  transform(value: any): any {
    return value.toString().toUpperCase();
  }

}
