import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sanitizeObject } from '../utils/sanitize-object/sanitize-object';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  private _excludedUrlsRegex: RegExp[];
  private _excludedUrls = ['.svg'];
  constructor() {
    this._excludedUrlsRegex = this._excludedUrls.map((urlPattern) => new RegExp(urlPattern, 'i')) || [];
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const passThrough: boolean = !!this._excludedUrlsRegex.find((regex) => regex.test(request.url));

    if (passThrough) {
      return next.handle(request);
    }
    const token: string = localStorage.getItem('HIDA-api-token');

    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
    }

    if (!request.headers.has('Content-Type') && request.method !== 'GET') {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }
    if (request.method !== 'GET') {
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
    }

    if (request.body) {
      request = request.clone({
        body: sanitizeObject(request.body)
      });
    }

    return next.handle(request);
  }
}
