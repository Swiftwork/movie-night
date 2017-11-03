import Vue from 'vue';
import 'vue-class-component';
import 'vue-router';
import 'vuex';

declare module 'vue/types/options' {
  // tslint:disable:interface-name
  interface ComponentOptions<V extends Vue> {
    style?: any;
  }
}
