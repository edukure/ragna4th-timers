import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { getAllMvpsIds, getMvpData } from '../utils/mvp-utils';

import SpawnSelect from '../components/SpawnSelect';
import MvpSelect from '../components/MvpSelect';

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  mvpData,
}) => {
  const [selectedMvp, setSelectedMvp] = useState<typeof mvpData[number]>(
    mvpData[0]
  );
  const [selectedSpawnIndex, setSelectedSpawnIndex] = useState(0);

  return (
    <div className="bg-gray-700 h-screen flex flex-col items-center">
      <Head>
        <title>timers</title>
      </Head>

      <div className="max-w-2xl w-full">
        <h1 className="text-xl text-white">Timers</h1>

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(selectedMvp, selectedSpawnIndex);
          }}
        >
          <div className="flex flex-row w-full gap-2">
            <div className="w-1/2">
              <MvpSelect
                mvps={mvpData}
                onChange={setSelectedMvp}
                value={selectedMvp}
              />
            </div>

            <div className="w-1/2">
              <SpawnSelect
                onChange={setSelectedSpawnIndex}
                spawns={selectedMvp.spawn}
                index={selectedSpawnIndex}
              />
            </div>
          </div>
          <button className="w-full py-2 bg-teal-600 rounded-lg text-white hover:bg-teal-800 font-semibold">
            adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const mvpData = getAllMvpsIds().map((id) => getMvpData(id));

  return {
    props: { mvpData },
  };
};

export default Home;
