import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { DefaultSeo } from "../components/seo";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <DefaultSeo/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
