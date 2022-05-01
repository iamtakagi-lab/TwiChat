import { useRouter } from 'next/router'
import Head from "next/head";
import React, { FormEvent, useEffect, useState } from "react";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { SiHatenabookmark } from "react-icons/si";
import { makeApiUrl } from "../common";
import { Layout } from "../components/layout";
import { Seo } from "../components/seo";
import { API_BASE_URL, APP_NAME, TWITTER_ID_REGEX } from "../consts";

const Index = () => {
  const [screenName, setScreenName] = useState("");
  const [isUnknownError, setIsUnknownError] = useState(false);
  const [isLearningError, setIsLearningError] = useState(false);
  const [isOpenChatError, setIsOpenChatError] = useState(false);
  const [openChatErrorMessage, setOpenChatErrorMessage] = useState("");

  /*
  const [isDeletedError, setIsDeletedError] = useState(false);
  const [isSuccessfullyDeleted, setIsSuccessfullyDeleted] = useState(false);
  */

  useEffect(() => {
    const current = new URL(location.href);

    const errorUnknown = current.searchParams.get("error_unknown");
    if (errorUnknown !== null && typeof errorUnknown !== "boolean") {
      setIsUnknownError(true);
    }

    const error24hourConstraint = current.searchParams.get(
      "error_24hour_constraint"
    );
    if (
      error24hourConstraint !== null &&
      typeof error24hourConstraint !== "boolean"
    ) {
      setIsLearningError(true);
    }

    /*
    const errorDeleted = current.searchParams.get("error_deleted");
    if (errorDeleted !== null && typeof errorDeleted !== "boolean") {
      setIsDeletedError(true);
    }

    const successfullyDeleted = current.searchParams.get("successfully_deleted");
    if (successfullyDeleted !== null && typeof successfullyDeleted !== "boolean") {
      setIsSuccessfullyDeleted(true);
    }*/

    const defaultScreenName = localStorage.getItem("default_screen_name");
    if (defaultScreenName !== null && screenName.search(TWITTER_ID_REGEX)) {
      setScreenName(defaultScreenName);
    }
  }, []);

  const tryOpenChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = new URL(makeApiUrl(`make_sentence/${screenName}`));
    const res = await fetch(url.href);
    const isChatError = res.status != 200;
    setIsOpenChatError(isChatError);
    if (isChatError) {
      setOpenChatErrorMessage((await res.json())["message"]);
      return;
    }
    const cleanedScreenName = screenName.replace("@", "");
    setScreenName(cleanedScreenName);
    location.href = `${location.pathname}${screenName}`
  };

  return (
    <>
      <Seo />
      <Layout>
        {isUnknownError && (
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "red",
              fontSize: ".8rem",
            }}
          >
            不明なエラーが発生しました。
          </p>
        )}
        <section id="top_section">
          <h2 id="top_title">もうひとりの自分と話せるアプリ</h2>
          <p>ツイッターアカウントを使って自分の分身を作ろう</p>
          <object
            id="top_logo"
            type="image/svg+xml"
            data="./images/logo.svg"
            width={"120px"}
          />
          <div>#もうひとりの自分と話そう</div>
          <p>自分だけの居場所がここにある。</p>
        </section>
        <section id="top_login_section">
          {isLearningError && (
            <div
              style={{
                textAlign: "center",
                color: "red",
                fontSize: ".8rem",
              }}
            >
            最後のツイート学習から24時間以上経過していません。
            </div>
          )}
          <button
            type="button"
            id="login_btn"
            className="btn"
            onClick={() =>
              (location.href = makeApiUrl(
                `auth/login?callback=${API_BASE_URL}auth/callback`
              ))
            }
          >
            <FaTwitter style={{ marginBottom: "2px", marginRight: "5px" }} />
            ツイートを学習させる
          </button>
          <p id="please_agree">
            <a href="https://twichat.app/terms_of_service">利用規約</a>・
            <a href="https://twichat.app/privacy_policy">プライバシーポリシー</a>{" "}
            に同意の上でご利用ください
          </p>
        </section>
        <section id="talk_others_section">
          <h2>分身と話してみる</h2>
          {isOpenChatError && (
            <div
              style={{
                textAlign: "center",
                color: "red",
                fontSize: ".8rem",
              }}
            >
              {openChatErrorMessage}
            </div>
          )}
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
              ここを押すと会話が始まるよ
            </button>
          </form>
        </section>
        {/*
        <section id="delete_section">
          <h2>削除</h2>
          {isDeletedError && (
            <div
              style={{
                textAlign: "center",
                color: "red",
                fontSize: ".8rem",
              }}
            >
            学習データの削除に失敗しました。
            </div>
          )}
          {isSuccessfullyDeleted && (
          <p
            style={{
              textAlign: "center",
              color: "green",
              fontSize: ".8rem",
            }}
          >
            学習データを削除しました。
          </p>
        )}
          <button
            type="button"
            id="learning_delete_btn"
            className="btn"
            onClick={() => (location.href = makeApiUrl(`auth/delete`))}
          >
            <FaTwitter style={{ marginBottom: "2px", marginRight: "5px" }} />
            学習データを削除する
          </button>
        </section>
        */}
        <section id="how_to_use_section">
          <h3 id="how_to_use">つかいかた</h3>
          <section className="how_to_use_description">
            <h4>もうひとりの自分と話したいとき</h4>
            <p>
              「ツイートを学習させる」ボタンを押します。
              <br />
              あなたのツイートを学習したもうひとりの自分と
              <br />
              チャットができます。
            </p>
          </section>
          <section className="how_to_use_description">
            <h4>他ユーザーの分身と話したいとき</h4>
            <p>
              「分身と話してみる」欄に ツイッターID
              を入力、「ここを押すと会話が始まるよ」ボタンを押します。ユーザーのツイートを学習した分身とチャットができます。
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
                `https://twitter.com/intent/tweet?text=${document.title}&hashtags=TwiChat,もうひとりの自分と話そう&url=https://twichat.iamtakagi.net`,
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
                "https://www.facebook.com/share.php?u=https://twichat.iamtakagi.net",
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
                `https://b.hatena.ne.jp/entry/panel/?url=https://twichat.iamtakagi.net&btitle=${document.title}`,
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
