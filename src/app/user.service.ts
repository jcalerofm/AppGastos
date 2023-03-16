// user.service.ts
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User, signOut } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.user$.next(user);
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  logout() {
    return signOut(this.auth);
  }
}




















// import { Injectable } from '@angular/core';
// import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor(private auth: Auth) { }

//   register(email: string, password: string) {
//     return createUserWithEmailAndPassword(this.auth, email, password);
//   }

//   login(email: string, password: string) {
//     return signInWithEmailAndPassword(this.auth, email, password);
//   }


// }

