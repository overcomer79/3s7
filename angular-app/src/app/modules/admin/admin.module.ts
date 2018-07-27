import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../../services/security/auth.guard";
import { DeveloperComponent } from "./developer/developer.component";

const adminRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "admin/developer",
    component: DeveloperComponent /*, canActivate: [AuthGuard] */
  }
]);

@NgModule({
  imports: [adminRouting, FormsModule],
  declarations: [DeveloperComponent]
})
export class AdminModule {}
