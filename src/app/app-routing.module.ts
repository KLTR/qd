import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutResolver } from '@app/resolvers';
import {AuthGuard} from '@app/guards'
import { MissionResolver } from '@app/resolvers'
import { SourcesListComponent } from './components/sources-list/sources-list.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'activeMission'
      },
      {
        path: 'activeMission',
        component: SourcesListComponent,
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
  {
    path: '**', redirectTo:
      '/login', pathMatch:
      'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
