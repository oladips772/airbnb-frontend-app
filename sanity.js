/** @format */
import dotenv from "dotenv";
dotenv.config();

import { createClient, createImageUrlBuilder } from "next-sanity";

const config = {
  dataset: "production",
  projectId: "yvesynox",
  useCdn: "production",
};

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const sanityClient = createClient(config);
