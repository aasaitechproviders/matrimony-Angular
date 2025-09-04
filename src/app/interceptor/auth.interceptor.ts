import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { SignupService } from '../services/signup/signup.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const signupService = inject(SignupService);

  const token = loginService.getToken() || signupService.getToken();

  if (token) {
    console.log('🔑 Interceptor hit, attaching token:', token);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
