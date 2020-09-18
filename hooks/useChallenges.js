import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase';

const useChallenges = (order) => {
  const [challenges, setChallenges] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const getChallenges = () => {
      firebase.db
        .collection('challenges')
        .orderBy(order, 'desc')
        .onSnapshot(handleSnapshot);
    };
    getChallenges();
  }, []);
  function handleSnapshot(snapshot) {
    const challenges = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChallenges(challenges);
  }
  return challenges;
};

export default useChallenges;
