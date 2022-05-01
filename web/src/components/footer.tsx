import React from "react";
import { APP_NAME } from "../consts";

export const Footer = () => (
  <footer id="footer">
    <p id="footer_copyright">© {APP_NAME}</p>
    <div id="footer_links">
      <a href="https://twichat.app/terms_of_service" className="footer_link">
        利用規約
      </a>
      <a href="https://twichat.app/privacy_policy" className="footer_link">
        プライバシーポリシー
      </a>
      <a href="https://twichat.app/faq" className="footer_link">
        よくある質問 (FAQ)
      </a>
      <a href="https://twichat.app/inquires" className="footer_link">
        お問い合わせ
      </a>
    </div>
    <div id="footer_accounts">
      <p className="footer_account">
        Made by{" "}
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
);
