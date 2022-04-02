import { getDownloadURL, ref } from "firebase/storage";
import useSWR from "swr";
import { storage } from "./firebase";

export const useDownloadUrl = (key: string) => {
  return useSWR([key], async () => {
    const storageKey = ref(storage, key);
    return await getDownloadURL(storageKey);
  });
};
