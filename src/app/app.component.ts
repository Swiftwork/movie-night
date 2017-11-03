import Vue from 'vue';
import Component from 'vue-class-component';

import { BannerComponent } from './banner/banner.component';
import { RatingComponent } from './rating/rating.component';

import style from './app.component.css';
import template from './app.component.html';

// The @Component decorator indicates the class is a Vue component
@Component({
  style: style,
  template: template,
  components: {
    BannerComponent,
    RatingComponent,
  },
})
export class AppComponent extends Vue {
  // Initial data can be declared as instance properties
  message: string = 'Hello!';
  // Component methods can be declared as instance methods
  onClick(): void {
    window.alert(this.message);
  }
}
