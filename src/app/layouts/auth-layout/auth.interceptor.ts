import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token: string = localStorage.getItem('token');

        let request = req;
       console.log('intercept')
        if (token) {
            request = req.clone({
                setHeaders: {
                    Content : 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            return next.handle(request).pipe(
                catchError((err: HttpErrorResponse) => {
    
                    if (err.status === 401) {
                        this.router.navigateByUrl('/login');
                    }
     
                    return throwError(err);
    
                })
            );
        }else{
            console.log('intercept')
            return next.handle(req.clone())
        }
    }
}