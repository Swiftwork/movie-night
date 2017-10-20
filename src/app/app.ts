import { NgModule } from 'angular-ts-decorators';

import * as angular from 'angular';

import { COMPONENT_DECLARATIONS } from './components';
import { DIRECTIVE_DECLARATIONS } from './directives';
import { PIPE_DECLARATIONS } from './pipes';
import { GreetingService, SERVICE_DECLARATIONS } from './services';

@NgModule({
  id: 'primula',
  imports: [
    'ngAria',
    'ngTouch',
    'ngSanitize',
  ],
  declarations: [
    ...PIPE_DECLARATIONS,
    ...DIRECTIVE_DECLARATIONS,
    ...COMPONENT_DECLARATIONS,
  ],
  providers: [
    ...SERVICE_DECLARATIONS,
  ],
})
export class PrimulaAppModule { }
