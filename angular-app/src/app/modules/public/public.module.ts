import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from '../../components/chat/chat.component';
import { CardGameComponent } from '../../components/card-game/card-game.component';

const publicRouting: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: HomeComponent /*canActivate: [RoleGuardService], data : { expectedRole: ['family','admin'] }*/ },
    { path: 'login', component: LoginComponent },
]);

@NgModule({
    imports: [
        publicRouting,
        FormsModule,
        BrowserModule,
        AngularFontAwesomeModule
    ],
    declarations: [
        HomeComponent,
        LoginComponent,
        ChatComponent,
        RegisterComponent,
        CardGameComponent
    ]
})
export class PublicModule {}