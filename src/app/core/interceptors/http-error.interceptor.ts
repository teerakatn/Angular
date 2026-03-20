import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError, timeout } from 'rxjs';
import { ErrorNotificationService } from '../services/error-notification.service';

const REQUEST_TIMEOUT_MS = 10000;

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorNotification = inject(ErrorNotificationService);

  return next(req).pipe(
    timeout(REQUEST_TIMEOUT_MS),
    retry({ count: 1, delay: 300 }),
    catchError((error: unknown) => {
      let message = 'เกิดข้อผิดพลาดจากระบบ กรุณาลองใหม่อีกครั้ง';

      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          message = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาตรวจสอบอินเทอร์เน็ต';
        } else if (error.status >= 500) {
          message = 'ระบบปลายทางมีปัญหา กรุณาลองใหม่อีกครั้ง';
        } else if (error.status === 404) {
          message = 'ไม่พบข้อมูลที่ต้องการ';
        }
      }

      errorNotification.show(message);
      return throwError(() => error);
    })
  );
};
