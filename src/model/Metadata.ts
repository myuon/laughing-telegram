import { ID3Tag, ID3TagV2 } from "id3js/lib/id3Tag";
import { arrayBufferToBase64 } from "../helpers/buffer";
import * as id3 from "id3js";

export interface MetadataImage {
  type?: string;
  mime?: string;
  description?: string;
  data?: string; // base64-encoded
}

export interface Metadata {
  title?: string;
  album?: string;
  artist?: string;
  year?: string;
  images?: MetadataImage[];
}

const parseID3TagAsMetadata = (tag: ID3Tag | null): Metadata => {
  const images: MetadataImage[] = [];
  if (tag?.["kind"] === "v2") {
    const tagV2 = tag as ID3TagV2;
    tagV2.images.forEach((image) => {
      images.push({
        type: image.type ?? undefined,
        mime: image.mime ?? undefined,
        description: image.description ?? undefined,
        data: image.data ? arrayBufferToBase64(image.data) : undefined,
      });
    });
  }

  return {
    title: tag?.title ?? undefined,
    album: tag?.album ?? undefined,
    artist: tag?.artist ?? undefined,
    year: tag?.year ?? undefined,
    images,
  };
};

export const parseMetadataFromFile = async (file: File): Promise<Metadata> => {
  return parseID3TagAsMetadata(await id3.fromFile(file));
};

export const getCoverImageInBase64 = (meta?: Metadata) => {
  const image = meta?.images?.[0];

  return image
    ? `data:${image?.mime ?? "image/jpg"};base64,${image?.data}`
    : undefined;
};
