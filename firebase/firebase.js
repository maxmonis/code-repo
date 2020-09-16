import app from 'firebase/app';
import config from './config';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }
  }
}

export default Firebase;
