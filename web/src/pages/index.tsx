import Head from "next/head";
import React, { FormEvent, useState } from "react";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { SiHatenabookmark } from "react-icons/si";
import { makeApiUrl } from "../common";
import { Layout } from "../components/layout";
import { Seo } from "../components/seo";
import { API_BASE_URL, APP_NAME } from "../consts";

const Index = () => {
  const [screenName, setScreenName] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const tryOpenChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = new URL(makeApiUrl(`make_sentence/${screenName}`));
    const res = await fetch(url.href);
    const isError = res.status != 200;
    setIsError(isError);
    if (isError) {
      setErrorMessage((await res.json())["message"]);
      return;
    }
    const cleanedScreenName = screenName.replace("@", "");
    setScreenName(cleanedScreenName);
    location.href = `${location.href}${screenName}`;
  };

  return (
    <>
      <Seo/>
      <Layout>
        <section id="top_section">
          <h2 id="top_title">もうひとりの自分と話せるアプリ</h2>
          <p>あなたはひとりじゃない。</p>
          <object
            id="top_logo"
            type="image/svg+xml"
            data="./images/logo.svg"
            width={"120px"}
          />
          <div>#もうひとりの自分と話そう</div>
          <p>自分だけの居場所がここにある。</p>
        </section>
        <section>
          <button
            type="button"
            id="login_btn"
            className="btn"
            onClick={() => {
              location.href = makeApiUrl(
                `auth/login?callback=${API_BASE_URL}auth/callback`
              );
            }}
          >
            <FaTwitter style={{ marginBottom: "2px", marginRight: "5px" }} />
            ツイッターでログイン
          </button>
          <p id="please_agree">
            <a href="/terms_of_service">利用規約</a>・
            <a href="/privacy_policy">プライバシーポリシー</a>{" "}
            に同意の上でご利用ください
          </p>
        </section>
        <section id="talk_others_section">
          <h2>他ユーザーの分身と話してみる</h2>
          {isError ? (
            <div style={{ color: "red", fontSize: ".8rem" }}>
              {errorMessage}
            </div>
          ) : null}
          <form
            onSubmit={(e) => {
              tryOpenChat(e);
            }}
          >
            <input
              type="text"
              id="screenName_input"
              value={screenName}
              required={true}
              maxLength={15}
              placeholder="ここにアカウント名を入力してね"
              onChange={(event) => setScreenName(event.target.value)}
            />
            <button type="submit" id="talk_others_btn" className="btn">
              他ユーザーの分身とチャットを始める
            </button>
          </form>
        </section>
        <section id="how_to_use_section">
          <h3 id="how_to_use">つかいかた</h3>
          <section className="how_to_use_description">
            <h4>もうひとりの自分と話したいとき</h4>
            <p>
              「ツイッターでログイン」ボタンを押します。
              <br />
              あなたのツイートを学習したもうひとりの自分と
              <br />
              チャットができます。
            </p>
          </section>
          <section className="how_to_use_description">
            <h4>他ユーザーの分身と話したいとき</h4>
            <p>
              「アカウント名を入力してね」欄に ツイッターID
              を入力、「他ユーザーの分身と話してみる」ボタンを押します。他ユーザーのツイートを学習した分身とチャットができます。
            </p>
          </section>
        </section>
        <section id="share_section">
          <h3 id="share">
            みんなに <img src="./images/logo.svg" width={"26px"} alt="" />
            <span className="logo">{APP_NAME}</span> を教えよう
          </h3>
          <button
            className="btn"
            id="twitter_share_btn"
            onClick={() =>
              open(
                `https://twitter.com/intent/tweet?text=${document.title}&hashtags=TwiChat,もうひとりの自分と話そう&url=https://twichat.app`,
                "_blank",
                "noreferrer"
              )
            }
          >
            <FaTwitter style={{ marginBottom: "2px", marginRight: "5px" }} />
            ツイート
          </button>
          <button
            className="btn"
            id="facebook_share_btn"
            onClick={() =>
              open(
                "https://www.facebook.com/share.php?u=https://twichat.app",
                "_blank",
                "noreferrer"
              )
            }
          >
            <FaFacebook style={{ marginBottom: "2px", marginRight: "5px" }} />
            Facebook
          </button>
          <button
            className="btn"
            id="hatebu_share_btn"
            onClick={() =>
              open(
                `https://b.hatena.ne.jp/entry/panel/?url=https://twichat.app&btitle=${document.title}`,
                "_blank",
                "noreferrer"
              )
            }
          >
            <SiHatenabookmark
              style={{ marginBottom: "2px", marginRight: "5px" }}
            />
            B! はてブ
          </button>
        </section>
      </Layout>
    </>
  );
};

export default Index;
