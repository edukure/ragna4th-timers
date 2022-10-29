import { setCookie } from 'cookies-next';
import { useState } from 'react';

import { TrackedMvp } from '../types/mvps';

const useTrackedMvps = (initialTrackedMvps: TrackedMvp[]) => {
  const [trackedMvps, setTrackedMvps] = useState(initialTrackedMvps);

  const updateCookie = (data: TrackedMvp[]) => {
    setCookie('trackedMvps', data);
  };

  const clear = () => {
    updateCookie([]);
    setTrackedMvps([]);
  };

  const add = (newMvp: TrackedMvp) => {
    // if list is empty
    // or spawn location hasnt been added yet
    const canAddToList =
      trackedMvps.length === 0 ||
      trackedMvps.filter((mvp) => {
        if (mvp.id === newMvp.id && mvp.spawn.mapname === newMvp.spawn.mapname)
          return true;

        return false;
      }).length === 0;

    if (!canAddToList) return;

    setTrackedMvps((prev) => {
      const newList = [...prev, newMvp];
      updateCookie(newList);
      return newList;
    });
  };

  const remove = (removedMvp: TrackedMvp) => {
    setTrackedMvps((prev) => {
      const newList = prev.filter(
        (mvp) =>
          mvp.id !== removedMvp.id &&
          mvp.spawn.mapname !== removedMvp.spawn.mapname
      );
      updateCookie(newList);
      return newList;
    });
  };

  return {
    clear,
    add,
    remove,
    trackedMvps,
  };
};

export default useTrackedMvps;
