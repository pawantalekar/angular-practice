import { Routes } from '@angular/router';
import { HelloComponent } from './hello-component/hello-component';
import { TemplateFormComponent } from './template-form-component/template-form-component';
import { ReactiveFormComponent } from './reactive-form-component/reactive-form-component';
import { PrimeNgFiltering } from './prime-ng-filtering/prime-ng-filtering';
import { AngularBasics } from './angular-basics/angular-basics';
import { NmfcCode } from './nmfc-code/nmfc-code';

export const routes: Routes = [
    {
        path:'hello',
        component:HelloComponent
    },
    {
        path:'template',
        component: TemplateFormComponent
    },
    {
        path:'reactive',
        component: ReactiveFormComponent
    },
    {
        path:'filtering',
        component:PrimeNgFiltering
    },
    {
        path:'angular-basics',
       component: AngularBasics
    },
    {
        path:'nmfc-code',
        component: NmfcCode
    }
];
