import { platformBrowserDynamic } from 'angular-ts-decorators';

import './styles/index.css';

import { PrimulaAppModule } from './app/app';

platformBrowserDynamic().bootstrapModule(PrimulaAppModule, {});
