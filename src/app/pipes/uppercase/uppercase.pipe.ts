import { Pipe, PipeTransform } from 'angular-ts-decorators';

@Pipe({ name: 'uppercase' })
export class UppercasePipe implements PipeTransform {
  public transform(item: string) {
    return item.toUpperCase();
  }
}
