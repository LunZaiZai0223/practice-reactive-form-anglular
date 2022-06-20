import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localYear'
})
export class LocalYearPipe implements PipeTransform {

  transform(value: string): string {
    // formControl passed validation then call pipe
    const year: number = Number(value.slice(0, 4));
    const localYear: number = Number(year - 1911);
    const localMonth: number = Number(value.slice(4, 6));
    const localDate: number = Number(value.slice(6, 8));
    return `民國 ${localYear} 年 ${localMonth} 月 ${localDate} 日`
  }

}
