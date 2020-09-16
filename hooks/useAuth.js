import { useState, useEffect } from 'react';
import firebase from '../firebase';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(user);
      } else {
        setAuthenticated(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return authenticated;
};

export default useAuth;
