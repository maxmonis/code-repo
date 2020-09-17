import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Challenge from '../components/layout/Challenge';
import { FirebaseContext } from '../firebase';

const Index = () => {
  const [challenges, setChallenges] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const getChallenges = () => {
      firebase.db
        .collection('challenges')
        .orderBy('created', 'desc')
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
  return (
    <div>
      <Layout>
        <div className='container'>
          <ul>
            {challenges.map((challenge) => (
              <Challenge key={challenge.id} challenge={challenge} />
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
};

export default Index;
