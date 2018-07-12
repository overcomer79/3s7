import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TrisComponent } from "./tris/tris.component";

const GamesRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "games/tris",
    component: TrisComponent
  }
]);

@NgModule({
  imports: [
    GamesRouting,
  ],
  declarations: [
    TrisComponent
  ]
})
export class GamesModule {}
