import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { some } from 'lodash';
import { PublicEndpoints } from '../../../config/configuration';
import { environment } from '../../../environments/environment';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = req;
    // if endpoint is protected, then set Authorization header
    if (!some(PublicEndpoints, (e) => environment.apiBase + e === req.url)) {
      modifiedReq = req.clone({ setHeaders: { Authorization: `Bearer ${this.auth.getToken()}` } });
    }
    return next.handle(modifiedReq);
  }
}
