import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { getAllMvpsIds, getMvpData } from '../utils/mvp-utils';

import { XMarkIcon } from '@heroicons/react/20/solid';

import SpawnSelect from '../components/SpawnSelect';
import MvpSelect from '../components/MvpSelect';
import useTrackedMvps from '../hooks/useTrackedMvps';

import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { TrackedMvp } from '../types/mvps';
import Image from 'next/image';

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ mvpData, initialTrackedMvps }) => {
  const [selectedMvp, setSelectedMvp] = useState<typeof mvpData[number]>(
    mvpData[0]
  );
  const [selectedSpawnIndex, setSelectedSpawnIndex] = useState(0);
  const { trackedMvps, add, remove } = useTrackedMvps(initialTrackedMvps);

  const addMvpToTrackedList: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    add({
      ...selectedMvp,
      spawn: selectedMvp.spawn[selectedSpawnIndex],
      deathTime: Date.now(),
    });
  };

  return (
    <div className="bg-gray-700 h-full min-h-screen flex flex-col items-center pb-8">
      <Head>
        <title>timers</title>
      </Head>

      <div className="max-w-2xl w-full h-full flex flex-col gap-4">
        <h1 className="text-xl text-white">Timers</h1>

        <form className="flex flex-col gap-2" onSubmit={addMvpToTrackedList}>
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

        <div className="flex flex-row flex-wrap w-full gap-2 justify-around">
          {trackedMvps.map((mvp) => (
            <MvpCard
              key={`${mvp.id}_${mvp.spawn.mapname}`}
              mvp={mvp}
              onRemove={() => remove(mvp)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const mvpData = getAllMvpsIds().map((id) => getMvpData(id));

  let initialTrackedMvps: TrackedMvp[];
  if (!hasCookie('trackedMvps', ctx)) {
    setCookie('trackedMvps', [] as TrackedMvp[], ctx);
    initialTrackedMvps = [];
  } else {
    const raw = getCookie('trackedMvps', ctx) as string;

    initialTrackedMvps = JSON.parse(raw);
  }

  return {
    props: { mvpData, initialTrackedMvps },
  };
};

export default Home;

const MvpCard = ({ mvp, onRemove }) => {
  const imgRef = useRef(null);

  const [overlayDimensions, setOverlayDimensions] = useState({
    width: 0,
    height: 0,
  });

  let width, height;
  if (imgRef.current) {
    height = imgRef.current.clientHeight;
    width = imgRef.current.clientWidth;
  }

  return (
    <div className="bg-white rounded-lg border-red-100 flex flex-row max-w-xs w-full">
      <div className="relative p-2 min-h-[120px] flex flex-col justify-center">
        <img
          ref={imgRef}
          src={`https://static.ragnaplace.com/db/npc/gif/${mvp.id}.gif`}
          className="object-contain w-16"
        />
        <div className={`absolute bg-slate-500 z-10 h-full w-16`} />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="border-b-2 border-slate-200 p-0.5 pr-1 w-full flex flex-row justify-between items-center">
          <div className="flex flex-row items-end gap-1">
            <h2 className="text-sm">{mvp.name}</h2>
            <span className="text-xs text-gray-400">(id: {mvp.id})</span>
          </div>
          <div>
            <button
              className="flex justify-center items-center bg-blue-600 rounded-lg p-0.5 hover:bg-blue-800"
              onClick={() => onRemove(mvp)}
            >
              <XMarkIcon
                className="h-3 w-3 text-black font-bold"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <span>location {mvp.spawn.mapname}</span>
        </div>
      </div>
    </div>
  );
};
