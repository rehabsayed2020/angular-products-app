import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({ url: `https://api.escuelajs.co/api/v1${req.url}` });
  return next(apiReq);
};
