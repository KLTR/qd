import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from '@app/guards';
// Angular Material
// Pipes
import {
  CharactersPipe,
  DayMonthOnlyPipe,
  FileSizePipe,
  FilterAlertsPipe,
  GetFilenameFromUrlPipe,
  MillToMinFilterPipe,
  OrderByPipe,
  SafeHtmlPipe,
  SecurePipe
} from '@app/pipes';
// Services
import {
  AppConfigService,
  AuthService,
  ConnectionService,
  HttpService,
  IconService,
  InterceptorService,
  MenuService,
  WsService
} from '@app/services';
// Intels lib
import { IntelsModule } from '@common/intels';
import { SatPopoverModule } from '@ncstate/sat-popover';
// Libraries
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { LottieAnimationViewModule } from 'ng-lottie';
import { MomentModule } from 'ngx-moment';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateCellComponent } from './components/ag-grid/date-cell-component';
import { OwnersCellComponent } from './components/ag-grid/owners-cell-component';
import { TemplateRendererComponent } from './components/ag-grid/template-renderer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { InfectionComponent } from './components/left-bar/infection/infection.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddTargetWizardComponent } from './components/modals/add-target-wizard/add-target-wizard.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { DatePickerModalComponent } from './components/modals/date-picker-modal/date-picker-modal.component';
import { DeviceListModalComponent } from './components/modals/device-list-modal/device-list-modal.component';
import { ExportModalComponent } from './components/modals/export-modal/export-modal.component';
import { SearchModalComponent } from './components/modals/search-modal/search-modal.component';
import { TasksModalComponent } from './components/modals/tasks-modal/tasks-modal.component';
import { RightBarComponent } from './components/right-bar/right-bar.component';
import { SourceTooltipComponent } from './components/source-tooltip/source-tooltip.component';
import { SourceCubeComponent } from './components/sources-list/source-cube/source-cube.component';
import { SourceInfoComponent } from './components/sources-list/source-info/source-info.component';
import { SourcesListComponent } from './components/sources-list/sources-list.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { AlertsModalComponent } from './components/system-bar/alerts/alerts-modal/alerts-modal.component';
import { AlertsStripComponent } from './components/system-bar/alerts/alerts-strip/alerts-strip.component';
import { BatteryComponent } from './components/system-bar/battery/battery.component';
import { PioneerComponent } from './components/system-bar/pioneer/pioneer.component';
// Components
import { SystemBarComponent } from './components/system-bar/system-bar.component';
import { StorageComponent } from './components/system-bar/storage/storage.component';
import { InternetComponent } from './components/system-bar/internet/internet.component';

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
    DatePickerModalComponent,
    PioneerComponent,
    BatteryComponent,
    TasksModalComponent,
    StorageComponent,
    InternetComponent
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
    ScrollingModule,
    // Libraries
    IntelsModule,
    NgbModule,
    SatPopoverModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true
    }),
    MomentModule,
    // AngularMaterial
    LottieAnimationViewModule.forRoot(),

    AgGridModule.withComponents([])
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
    TasksModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
