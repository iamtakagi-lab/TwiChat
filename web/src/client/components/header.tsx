import React from "react";
import { FaTwitter } from "react-icons/fa";
import { makeApiUrl } from "../common";
import { API_BASE_URL, APP_NAME } from "../consts";

export const Header = () => (
  <header className="header">
    <div id="header_left">
      <div
        className="logo"
        id="header_logo"
        onClick={() => (location.href = "/")}
      >
        <object type="image/svg+xml" data="./images/logo.svg" width={"26px"} />
        {APP_NAME}
      </div>
    </div>
    <div id="header_right">
      <div
        id="header_login_btn"
        onClick={() => {
          location.href = makeApiUrl(
            `auth/login?callback=${API_BASE_URL}auth/callback`
          );
        }}
      >
        <FaTwitter style={{ marginBottom: "2px", marginRight: "2px" }} />
        ログイン
      </div>
    </div>
  </header>
);
