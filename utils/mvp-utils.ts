import { mvps } from '../data/mvps';

export const getAllMvpsIds = () => mvps.map((mvp) => mvp.id);

export const getMvpData = (id: number) => {
  const { propertyTable, ...rest } = mvps.find((mvp) => mvp.id === id);

  return rest;
};
