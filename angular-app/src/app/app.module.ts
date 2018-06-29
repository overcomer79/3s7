import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  SocialLoginModule,
  AuthServiceConfig,
  LoginOpt
} from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";

import { AngularFontAwesomeModule } from "angular-font-awesome";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { UtentiConnessiBadgeComponent } from "./home/utenti-connessi-badge/utenti-connessi-badge.component";
import { ChatComponent } from "./home/chat/chat.component";
import { AppRoutingModule } from ".//app-routing.module";
import { LocalAuthService } from "./auth.service";
import { PrivateComponent } from "./private/private.component";
import { PrivateService } from "./private.service";
import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./token-interceptor.service";
import * as conf from "../../../shared/config/keys";
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

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    UtentiConnessiBadgeComponent,
    ChatComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    LocalAuthService,
    AuthGuard,
    PrivateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
