import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth) { }

  login(userData: User): any{
    return this.auth.signInWithEmailAndPassword(userData.email, userData.password);
  }

  logout(): any{
    return this.auth.signOut();
  }
}
