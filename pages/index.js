import React from 'react';
import Layout from '../components/layout/Layout';
import Preview from '../components/layout/Preview';
import useChallenges from '../hooks/useChallenges';

const Index = () => {
  const challenges = useChallenges('published');
  return (
    <div>
      <Layout>
        <div className='container'>
          <ul>
            {challenges.map((challenge) => (
              <Preview key={challenge.id} challenge={challenge} />
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
};

export default Index;
