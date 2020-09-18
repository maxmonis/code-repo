import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Challenge from '../components/layout/Challenge';
import useChallenges from '../hooks/useChallenges';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;
  const challenges = useChallenges('published');
  const [result, setResult] = useState([]);
  useEffect(() => {
    const search = q.toLowerCase();
    const filter = challenges.filter((challenge) => {
      return (
        challenge.name.toLowerCase().includes(search) ||
        challenge.description.toLowerCase().includes(search)
      );
    });
    setResult(filter);
  }, [q, challenges]);
  return (
    <div>
      <Layout>
        <div className='container'>
          <ul>
            {result.map((challenge) => (
              <Challenge key={challenge.id} challenge={challenge} />
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
};

export default Search;
