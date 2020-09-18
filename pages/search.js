import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Challenge from '../components/layout/Challenge';
import useChallenges from '../hooks/useChallenges';
import { useRouter } from 'next/router';
import Error from '../components/layout/404';

const Search = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;
  const challenges = useChallenges('published');
  const [result, setResult] = useState([]);
  useEffect(() => {
    const search = q.toLowerCase().replace(/ /g, '');
    const filtered = challenges.filter((challenge) => {
      return (
        challenge.name.toLowerCase().replace(/ /g, '').includes(search) ||
        challenge.description.toLowerCase().replace(/ /g, '').includes(search)
      );
    });
    setResult(filtered);
  }, [q, challenges]);
  return !result.length ? (
    <Error message={'Your query did not return any results'} />
  ) : (
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
