import React from "react";
import Head from "next/head";
import favicon from "../../../public/assets/images/brand-logos/favicon.png";

const Seo = ({ title }: { title: string }) => {
  let i = `Peeky- ${title}`;
  return (
    <Head>
      <title>{i}</title>
      <link rel="icon" href={favicon.src} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <meta
        name="description"
        content="Peeky platforması"
      />
      <meta name="author" content="Peeky" />
      <meta
        name="keywords"
        content="survey"
      ></meta>
    </Head>
  );
};

export default Seo;
