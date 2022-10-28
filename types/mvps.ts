export type Spawn = {
  mapname: string;
  respawnTime: number;
};

export type MvpData<Id = number> = {
  id: Id;
  name: string;
  spawn: Spawn[];
  propertyTable: {
    '0': number;
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
    '6': number;
    '7': number;
    '8': number;
    '9': number;
  };
  image: string;
};
