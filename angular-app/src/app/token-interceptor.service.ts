import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { LocalAuthService } from "./auth.service";

@Injectable(/*{
  providedIn: "root"
}*/)
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req, next) {
    const authService = this.injector.get(LocalAuthService);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: authService.getToken() || ""
      }
    });
    return next.handle(tokenizedReq);
  }
}
