import React from "react";
import { APP_NAME } from "../consts";
import { Layout } from "../components/layout";
import { Seo } from "../components/seo";
import Head from "next/head";

const Inquires = () => (
  <>
    <Seo pageSubTitle="お問い合わせ"></Seo>
    <Layout>
      <section id="inquires_section">
        <h2>お問い合わせ</h2>
        <p id="inquires">
          開発者アカウント{" "}
          <img src="./images/919takagi.png" alt="" width={"30px"} height={"30px"} />{" "}
          <a href="https://twitter.com/919takagi">@919takagi</a>
        </p>
        <br />
        <p>
          ダイレクトメッセージ (DM) または
          メンションツイートにて随時返信します。
        </p>
      </section>
    </Layout>
  </>
);

export default Inquires;
