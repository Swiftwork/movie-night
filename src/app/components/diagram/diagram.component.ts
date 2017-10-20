const DiagramTemplate = require('./diagram.component.html');
const DiagramStyles = require('./diagram.component.css');

import { Component, Input } from 'angular-ts-decorators';
import { GreetingService } from '../../services';

export interface IDiagram {
  title: string,
  data: number[],
}

@Component({
  selector: 'cDiagram',
  styles: [DiagramStyles],
  templateUrl: DiagramTemplate.id,
})
export class DiagramComponent {

  @Input() model: IDiagram;

  private total: number = 0;
  private greeting: string;

  constructor(
    private greetingService: GreetingService,
  ) {
  }

  ngOnInit() {
    this.total = this.model.data.reduce((sum, next) => sum + next, 0);
    this.greeting = this.greetingService.getGreeting();
  }

  formatPercentage(value: number) {
    return value / this.total * 100 >> 0;
  }
}
