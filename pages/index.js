/** @format */
import Head from "next/head";
import { sanityClient } from "../sanity";

export default function Home({ properties }) {
  console.log(properties)
  return (
    <div>
      <Head>
        <title>AirBnb</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>sanity app</h1>
    </div>
  );  
}

export async function getServerSideProps() {
  const query = `*[_type == "property"]`;
  const properties = await sanityClient.fetch(query);

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    };
  } else {
    return {
      props: {
        properties,
      },
    };
  }
}
