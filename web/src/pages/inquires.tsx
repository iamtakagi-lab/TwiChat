import React from "react";
import { APP_NAME } from "../consts";
import { Layout } from "../components/layout";

const Inquires = () => (
  <Layout>
    <section id="inquires_section">
      <h2>お問い合わせ</h2>
      <p id="inquires">
        公式アカウント{" "}
        <img src="./twichat_app.jpg" alt="" width={"30px"} height={"30px"} />{" "}
        <a href="https://twitter.com/twichat_app">@twichat_app</a>
      </p>
      <br />
      <p>
        ダイレクトメッセージ (DM) または メンションツイートにて随時返信します。
      </p>
    </section>
    <footer id="footer">
      <p id="footer_copyright">© {APP_NAME}</p>
      <div id="footer_links">
        <a href="/terms_of_service" className="footer_link">
          利用規約
        </a>
        <a href="/privacy_policy" className="footer_link">
          プライバシーポリシー
        </a>
        <a href="/faq" className="footer_link">
          よくある質問 (FAQ)
        </a>
        <a href="/inquires" className="footer_link">
          お問い合わせ
        </a>
      </div>
      <div id="footer_accounts">
        <p className="footer_account">
          公式アカウント:{" "}
          <img
            src="./images/twichat_app.jpg"
            alt=""
            width={"30px"}
            height={"30px"}
          />{" "}
          <a href="https://twitter.com/twichat_app">@twichat_app</a>
        </p>
        <p className="footer_account">
          開発・運営・デザイン:{" "}
          <img
            src="./images/919takagi.png"
            alt=""
            width={"30px"}
            height={"30px"}
          />{" "}
          <a href="https://twitter.com/919takagi">@919takagi</a>
        </p>
      </div>
    </footer>
  </Layout>
);

export default Inquires