import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SocialLoginModule, AuthServiceConfig, LoginOpt, GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import {RouterModule} from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./services/security/auth.guard";
import { LocalAuthService } from "./services/security/auth.service";
import { TokenInterceptorService } from "./services/security/token-interceptor.service";
import * as conf from "../../../shared/config/keys";
import { PublicModule } from "./modules/public/public.module";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { PrivateModule } from "./modules/private/private.module";
import { UtentiConnessiBadgeComponent } from "./components/utenti-connessi-badge/utenti-connessi-badge.component";
import { AdminModule } from "./modules/admin/admin.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomsModule } from "./modules/rooms/rooms.module";
import { RoomsService } from "./services/rooms/rooms.service";
import { HomeService } from "./modules/public/home/home-service";

/*
const fbLoginOptions: LoginOpt = {
  scope:
    "pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages",
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

const googleLoginOptions: LoginOpt = {
  scope: "profile email"
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

*/

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(conf.keys.google.clientID/*, googleLoginOptions*/)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(conf.keys.facebook.clientID/*, fbLoginOptions*/)
  }
]);

const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    UtentiConnessiBadgeComponent
  ],
  imports: [
    rootRouting,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    SocialLoginModule,
    PublicModule,
    PrivateModule,
    AdminModule,
    RoomsModule,
    NgbModule.forRoot()
  ],
  providers: [
    LocalAuthService,
    AuthGuard,
    RoomsService,
    HomeService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: AuthServiceConfig, useFactory: provideConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
