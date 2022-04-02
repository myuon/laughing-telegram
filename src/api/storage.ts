import { getDownloadURL, listAll, ref } from "firebase/storage";
import useSWR from "swr";
import { storage } from "./firebase";

export const useDownloadUrl = (key: string | undefined) => {
  return useSWR(key ? [key] : null, async () => {
    const storageKey = ref(storage, key);
    return await getDownloadURL(storageKey);
  });
};

export const useListAll = (key: string) => {
  return useSWR([key], async () => {
    const storageKey = ref(storage, key);
    return await (
      await listAll(storageKey)
    ).items.map((item) => ({ fullPath: item.fullPath, name: item.name }));
  });
};
