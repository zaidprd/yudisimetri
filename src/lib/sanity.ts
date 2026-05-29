import { createClient } from "@sanity/client";
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Langsung mengunci nilai asli dari dashboard Cloudflare Anda
const projectId = "6kbljekd";
const dataset = "production";
const apiVersion = "2023-05-03"; 

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // true untuk produksi cepat
});

const builder: ImageUrlBuilder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}
