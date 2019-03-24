import { SecurePipe } from './pipes/secure.pipe';
import { SourceInfoComponent } from './components/sources-list/source-info/source-info.component';
// Modules
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule,
  APP_INITIALIZER
} from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  LoginComponent
} from './components/login/login.component';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http'
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  LottieAnimationViewModule
} from 'ng-lottie';
import {
  ToastNoAnimationModule
} from 'ngx-toastr';

// Services
import {
  HttpService,
  AuthService,
  IconService,
  MenuService,
  InterceptorService,
  WsService,
  ConnectionService,
  AppConfigService,
} from "@app/services";

// Components

import {
  SystemBarComponent
} from './components/system-bar/system-bar.component';
import {
  HeaderComponent
} from './components/header/header.component';
import {
  MenuComponent
} from './components/menu/menu.component';
import {
  LayoutComponent
} from './components/layout/layout.component';
import {
  SvgIconComponent
} from './components/svg-icon/svg-icon.component';
import {
  SourcesListComponent
} from './components/sources-list/sources-list.component';
import {
  AddTargetWizardComponent
} from './components/modals/add-target-wizard/add-target-wizard.component';
import {
  AlertsModalComponent
} from './components/system-bar/alerts/alerts-modal/alerts-modal.component'
import {
  ConfirmModalComponent
} from './components/modals/confirm-modal/confirm-modal.component';
import {
  AlertsStripComponent
} from './components/system-bar/alerts/alerts-strip/alerts-strip.component';
import {
  LeftBarComponent
} from './components/left-bar/left-bar.component';
import {
  RightBarComponent
} from './components/right-bar/right-bar.component';
import {
  ExportModalComponent
} from './components/modals/export-modal/export-modal.component'
import {
  SatPopoverModule
} from '@ncstate/sat-popover';

// Intels lib
import {IntelsModule} from '@quadream/common/dist/intels'
// Pipes
import {
  CharactersPipe,
  SafeHtmlPipe,
  FilterAlertsPipe,
  DayMonthOnlyPipe,
  GetFilenameFromUrlPipe,
  FileSizePipe,
  OrderByPipe,
  MillToMinFilterPipe,
  // SecurePipe
} from '@app/pipes';
import {
  AuthGuard
} from '@app/guards';

// Libraries
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  SearchModalComponent
} from './components/modals/search-modal/search-modal.component';

import {
  AgGridModule
} from 'ag-grid-angular';
import {
  SourceTooltipComponent
} from './components/source-tooltip/source-tooltip.component';
import {
  DeviceListModalComponent
} from './components/modals/device-list-modal/device-list-modal.component';

import {
  MomentModule
} from 'ngx-moment';
import {
  InfectionComponent
} from './components/left-bar/infection/infection.component';
import {
  TemplateRendererComponent
} from './components/ag-grid/template-renderer.component';
import {
  OwnersCellComponent
} from './components/ag-grid/owners-cell-component';
import {
  DateCellComponent
} from './components/ag-grid/date-cell-component';
import { SourceCubeComponent } from './components/sources-list/source-cube/source-cube.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DatePickerModalComponent } from './components/modals/date-picker-modal/date-picker-modal.component';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

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
    AddTargetWizardComponent,
    SearchModalComponent,
    LeftBarComponent,
    SourcesListComponent,
    RightBarComponent,
    SourceTooltipComponent,
    DeviceListModalComponent,
    InfectionComponent,
    SourceCubeComponent,
    ConfirmModalComponent,
    ExportModalComponent,
    SourceInfoComponent,
    // Cells
    TemplateRendererComponent,
    OwnersCellComponent,
    DateCellComponent,
    // Pipes
    CharactersPipe,
    SafeHtmlPipe,
    FilterAlertsPipe,
    DayMonthOnlyPipe,
    GetFilenameFromUrlPipe,
    FileSizePipe,
    OrderByPipe,
    MillToMinFilterPipe,
    SecurePipe,
    LoadingComponent,
    DatePickerModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    BrowserAnimationsModule,
    // Libraries
    IntelsModule,
    NgbModule,
    SatPopoverModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
    }),
    MomentModule,
    // AngularMaterial
    LottieAnimationViewModule.forRoot(),

    AgGridModule.withComponents([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    HttpService,
    AuthService,
    IconService,
    MenuService,
    InterceptorService,
    // WebsocketService,
    WsService,
    ConnectionService,
    // Guards
    AuthGuard,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  entryComponents: [
    SearchModalComponent,
    AddTargetWizardComponent,
    DeviceListModalComponent,
    AlertsModalComponent,
    TemplateRendererComponent,
    OwnersCellComponent,
    DateCellComponent,
    ConfirmModalComponent,
    ExportModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
