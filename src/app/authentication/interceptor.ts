import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic authentication credentials if available
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: authToken
        }
      });
    }

    return next.handle(request);
  }
}

