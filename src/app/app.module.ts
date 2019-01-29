// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { CustomRouterStateSerializer, effects, metaReducers, reducers } from '@app/state'
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LottieAnimationViewModule } from 'ng-lottie';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule
} from 'ngx-toastr';

// Angular Mat Modules
import {CustomMaterialModule} from './modules/material-module';
// Services
import {
  HttpService,
  AuthService,
  LoaderService,
  IconService,
  MenuService,
  InterceptorService,
  WsService
} from "@app/services";

// Components
import {
  LayoutResolver,
} from "@app/resolvers"
import { SystemBarComponent } from './components/system-bar/system-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { SourcesListComponent } from './components/sources-list/sources-list.component';
import { StoreModule } from '@ngrx/store';
import { AddTargetWizardComponent } from './components/add-target-wizard/add-target-wizard.component';
import {AlertsModalComponent} from './components/system-bar/alerts/alerts-modal/alerts-modal.component'
import { AlertsStripComponent } from './components/system-bar/alerts/alerts-strip/alerts-strip.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { RightBarComponent } from './components/right-bar/right-bar.component';
import { SatPopoverModule } from '@ncstate/sat-popover';

// Pipes
import {
  CharactersPipe, SafeHtmlPipe, CaseFilterPipe, SignalStrenghtPipe,
  TooltipDataFilterPipe, FilterAlertsPipe, SortAppsPipe, CubeIconsPipe, SourceByTypePipe,
  RemoveDuplicatesPipe, DayMonthOnlyPipe, GetFilenameFromUrlPipe, SetActiveMailPipe, BitesToKbPipe, OrderByPipe,
} from '@app/pipes';
import { AuthGuard } from '@app/guards';

// Libraries
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModalComponent } from './components/modals/search-modal/search-modal.component';

import { AgGridModule } from 'ag-grid-angular';
import { DeviceTooltipComponent } from './components/device-tooltip/device-tooltip.component';


@NgModule({
  declarations: [
    // Components
    AppComponent,
    LoginComponent,
    SystemBarComponent,
    HeaderComponent,
    AlertsModalComponent,
    MenuComponent,
    LayoutComponent,
    AlertsStripComponent,
    SvgIconComponent,
    // Pipes
    CharactersPipe,
    CaseFilterPipe,
    SafeHtmlPipe,
    SignalStrenghtPipe,
    TooltipDataFilterPipe,
    FilterAlertsPipe,
    SortAppsPipe,
    CubeIconsPipe,
    SourceByTypePipe,
    RemoveDuplicatesPipe,
    DayMonthOnlyPipe,
    GetFilenameFromUrlPipe,
    SetActiveMailPipe,
    BitesToKbPipe,
    OrderByPipe,
    AddTargetWizardComponent,
    SearchModalComponent,
    LeftBarComponent,
    SourcesListComponent,
    RightBarComponent,
    DeviceTooltipComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot(effects),
    BrowserAnimationsModule,
    // Libraries
    NgbModule,
    SatPopoverModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
    }),
    // AngularMaterial
    CustomMaterialModule,
    LottieAnimationViewModule.forRoot(),
    
    AgGridModule.withComponents([]),
    // WebSocketModule.forRoot(environment.websocketUrl),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    HttpService,
    AuthService,
    LoaderService,
    IconService,
    MenuService,
    InterceptorService,
    // WebsocketService,
    WsService,
  // Resolvers
  LayoutResolver,
  // Guards
  AuthGuard,
  ],
  entryComponents:[
    SearchModalComponent,
    AddTargetWizardComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
