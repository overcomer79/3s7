import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "../../services/security/auth.guard";

const privateRouting: ModuleWithProviders = RouterModule.forChild([
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] }
]);

@NgModule({
  imports: [privateRouting, FormsModule],
  declarations: [ProfileComponent]
})
export class PrivateModule {}
