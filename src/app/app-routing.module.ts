import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutResolver } from '@app/resolvers';
import {AuthGuard} from '@app/guards'
import {TestComponent} from './components/test/test.component'
import { MissionResolver } from '@app/resolvers'
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'activeMission'
      },
      {
        path: 'activeMission',
        component: TestComponent,
        // resolve: {
        //   missionData: MissionResolver
        // },
      },
    ],
    resolve: {
      layoutData: LayoutResolver
    }
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
