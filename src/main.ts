import Vue from 'vue';
import { AppComponent } from './app/app.component';

import './styles/index.css';

// tslint:disable:no-unused-expression
new Vue({
  el: '#root',
  template: `<app-component></app-component>`,
  data: { name: 'World' },
  components: {
    AppComponent,
  },
});
