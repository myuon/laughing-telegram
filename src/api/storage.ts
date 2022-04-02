import {
  getBlob,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import useSWR from "swr";
import { storage } from "./firebase";
import * as id3 from "id3js";
import { ID3Tag } from "id3js/lib/id3Tag";

export const useDownloadUrl = (key: string | undefined) => {
  return useSWR(key ? [key] : null, async () => {
    const storageKey = ref(storage, key);
    return await getDownloadURL(storageKey);
  });
};

export const useListAll = (key: string) => {
  return useSWR([key], async () => {
    const storageKey = ref(storage, key);
    return await (await listAll(storageKey)).items
      .map((item) => ({ fullPath: item.fullPath, name: item.name }))
      .filter((item) => !item.fullPath.endsWith(".metadata"));
  });
};

export const useFetchMetadata = (key: string) => {
  return useSWR([key], async () => {
    const storageKey = ref(storage, `${key}.metadata`);
    const blob = await getBlob(storageKey);
    return JSON.parse(await blob.text()) as Partial<ID3Tag>;
  });
};

export const uploadMusicFileAndMetadata = async (
  userId: string,
  file: File
) => {
  const metadata: object = (await id3.fromFile(file)) ?? {};

  const snapshot = await uploadBytes(
    ref(storage, `/user/${userId}/${file.name}`),
    file
  );
  console.log(`File uploaded`, snapshot);

  const snapshotMetadata = await uploadString(
    ref(storage, `/user/${userId}/${file.name}.metadata`),
    JSON.stringify(metadata)
  );
  console.log(`Metadata uploaded`, snapshotMetadata);
};
