import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TrisComponent } from "./tris/tris.component";
import { RoomComponent } from './room/room.component';

const RoomsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "rooms/:id",
    component: RoomComponent
  }
]);

@NgModule({
  imports: [
    RoomsRouting,
  ],
  declarations: [
    TrisComponent,
    RoomComponent
  ]
})
export class RoomsModule {}
