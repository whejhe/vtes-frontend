// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError, finalize } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AsyncService {

//   loading: boolean = false;
//   error: any;
//   value: any;

//   constructor() { }

//   useAsync(callback: () => Promise<any>, dependencies: any[] = []): Observable<any> {
//     this.loading = true;
//     this.error = undefined;
//     this.value = undefined;

//     const callbackMemoized = (): Promise<any> => {
//       return new Promise((resolve, reject) => {
//         callback()
//           .then((result: any) => {
//             this.value = result;
//             resolve(result);
//           })
//           .catch((error: any) => {
//             this.error = error;
//             reject(error);
//           })
//           .finally(() => {
//             this.loading = false;
//           });
//       });
//     };

//     return new Observable(observer => {
//       callbackMemoized()
//         .then((result: any) => {
//           observer.next(result);
//           observer.complete();
//         })
//         .catch((error: any) => {
//           observer.error(error);
//         });
//     }).pipe(
//       catchError(err => {
//         this.error = err;
//         return throwError(err);
//       }),
//       finalize(() => {
//         this.loading = false;
//       })
//     );
//   }
// }
