import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router){}

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/auth/login']);
        }
      }),
      take(1)
    );
  }

}
