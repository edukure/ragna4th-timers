import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { getMvpNames } from '../utils/mvp-utils';

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  mvpNames,
}) => {
  return (
    <div className="bg-gray-700 h-screen flex flex-col items-center">
      <Head>
        <title>timers</title>
      </Head>

      <div className="max-w-2xl">
        <h1 className="text-xl text-white">Timers</h1>

        <pre>{JSON.stringify(mvpNames, null, 2)}</pre>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const mvpNames = getMvpNames();

  return {
    props: { mvpNames },
  };
};

export default Home;
