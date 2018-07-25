import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TrisComponent } from "./tris/tris.component";
import { RoomComponent } from './room/room.component';
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { CardTableComponent } from '../../components/card-table/card-table.component';
import { PublicModule } from "../public/public.module";
import { ChatComponent } from "../../components/chat/chat.component";


const RoomsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "rooms/:id",
    component: RoomComponent
  }
]);

@NgModule({
  imports: [
    RoomsRouting,
    AngularFontAwesomeModule,
    PublicModule
  ],
  declarations: [
    TrisComponent,
    RoomComponent,
    CardTableComponent,
    // ChatComponent
  ]
})
export class RoomsModule {}
