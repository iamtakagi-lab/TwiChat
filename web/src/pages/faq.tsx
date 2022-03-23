import Head from "next/head";
import React from "react";
import { Layout } from "../components/layout";
import { Seo } from "../components/seo";

const Faq = () => (
  <>
    <Seo pageSubTitle="よくある質問 (FAQ)"/>
    <Layout>
      <section id="inquires_section">
        <h2>よくある質問 (FAQ)</h2>
      </section>
    </Layout>
  </>
);

export default Faq;
