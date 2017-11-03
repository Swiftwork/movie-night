import Vue from 'vue';
import Component from 'vue-class-component';

import style from './rating.component.css';
import template from './rating.component.html';

@Component({
  style: style,
  template: template,
  props: [
    'rating',
  ],
})
export class RatingComponent extends Vue {

}
