// src/lib/sanity.ts (Versi Final dengan .env)

import { createClient } from "@sanity/client";
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Ambil variabel dari environment (.env)
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;
const apiVersion = "2023-05-03"; // Tetapkan versi API

// Validasi untuk memastikan variabel ada
if (!projectId || !dataset) {
  throw new Error(
    "PUBLIC_SANITY_PROJECT_ID dan PUBLIC_SANITY_DATASET harus diatur di file .env"
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `true` untuk produksi agar cepat
});

const builder: ImageUrlBuilder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}
