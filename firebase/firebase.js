import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/';
import config from './config';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
    this.db = app.firestore();
  }
  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({ displayName: name });
  }
  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  async logout() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
