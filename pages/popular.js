import React from 'react';
import Layout from '../components/layout/Layout';
import Challenge from '../components/layout/Challenge';
import useChallenges from '../hooks/useChallenges';

const Popular = () => {
  const challenges = useChallenges('votes');
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

export default Popular;
