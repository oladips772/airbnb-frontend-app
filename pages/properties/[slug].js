/** @format */
import React from "react";
import { sanityClient, urlFor } from "../../sanity";

function property({ property }) {
  console.log(property);

  return (
    <div>
      {property.title}
      <h1>{property.description}</h1>
      <img src={urlFor(property.mainImage)} alt="" />
    </div>
  );
}

export async function getServerSideProps(pageContext) {
  const pageSlug = pageContext.query.slug;
  const query = `*[_type == "property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    beds,
    bedrooms,
    description,
    pricePerNight,
    host->{
      _id,
      name,
      image,  
      slug,
    },
    reviews[] {
      ...,
      traveller-> {
        _id,
        name,
        image,
        slug,
      },
    }
  }`;
  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        property,
      },
    };
  }
}

export default property;
