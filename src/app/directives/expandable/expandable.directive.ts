import { Directive, Input } from 'angular-ts-decorators';

const DiagramStyles = require('./expandable.directive.css');

@Directive({
  selector: 'dExpandable',
})
export class ExpandableDirective {

  // Using alias requires specifying operator < @ = &
  @Input('<dExpandable') expanded = false;

  private toggler: HTMLAnchorElement;

  constructor(
    private $element: ng.IAugmentedJQuery,
  ) {
    this.onToggle = this.onToggle.bind(this);

    this.toggler = document.createElement('a');
    this.toggler.classList.add('d-expandable--toggler');
    this.toggler.addEventListener('click', this.onToggle);
    this.$element.prepend(this.toggler);
  }

  ngOnInit() {
    this.$element.attr('aria-expanded', this.expanded.toString());
  }

  ngOnDestroy() {
    this.toggler.removeEventListener('click', this.onToggle);
  }

  onToggle() {
    this.expanded = !this.expanded;
    this.$element.attr('aria-expanded', this.expanded.toString());
  }
}
