import store2 from "store2";

const ENVS = {
  image: process.env.REACT_APP_IMAGE_URL || "",
};

const StorageManager = {
  set: (key: string, value: any) => store2.set(key, value),
  get: (key: string) => store2.get(key),
  del: (key: string) => store2.remove(key),
};

export { ENVS, StorageManager };
