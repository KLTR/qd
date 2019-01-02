import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http'
// import { PageLoaderComponent } from './components/shared/page-loader/page-loader.component';
import { StoreModule } from '@ngrx/store';
import { CustomRouterStateSerializer, effects, metaReducers, reducers } from '@app/state'
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  HttpService,
  AuthService,
  LoaderService,
  IconService,
  MenuService,
  // WebsocketService,
  WsService
} from "@app/services";
import {
  LayoutResolver,
} from "@app/resolvers"
import { SystemBarComponent } from './components/system-bar/system-bar.component';
import { InterceptorTooltipComponent } from './components/system-bar/interceptor-tooltip/interceptor-tooltip.component';
import { HeaderComponent } from './components/header/header.component';
import { AlertsModalComponent } from './components/header/alerts-modal/alerts-modal.component';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AlertsStripComponent } from './components/header/alerts-strip/alerts-strip.component'
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';

import {
  CharactersPipe, SafeHtmlPipe, CaseFilterPipe, SignalStrenghtPipe, MissionWizardOperatorsPipe,
  TooltipDataFilterPipe, FilterAlertsPipe, SortAppsPipe, CubeIconsPipe, SourceByTypePipe, FilterArrayByInputPipe,
  RemoveDuplicatesPipe, DayMonthOnlyPipe, GetFilenameFromUrlPipe, SetActiveMailPipe, BitesToKbPipe, OrderByPipe,
} from '@app/pipes';
import { AuthGuard } from '@app/guards';

// Libraries
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './components/test/test.component';
import { SearchModalComponent } from './components/modals/search-modal/search-modal.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';

// import {WebSocketModule} from '@app/services/websocket'
// import { environment } from '@env/environment.prod';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    LoginComponent,
    SystemBarComponent,
    InterceptorTooltipComponent,
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
    TestComponent,
    SearchModalComponent,
    LeftBarComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot(effects),
    // Libraries
    NgbModule,
    // WebSocketModule.forRoot(environment.websocketUrl),

  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    HttpService,
    AuthService,
    LoaderService,
    IconService,
    MenuService,
    // WebsocketService,
    WsService,
  // Resolvers
  LayoutResolver,
  // Guards
  AuthGuard,
  ],
  entryComponents:[
    SearchModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
