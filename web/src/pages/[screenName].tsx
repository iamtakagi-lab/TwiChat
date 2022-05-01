import React, { useState, useRef, useEffect, FormEvent } from "react";
import { FaPaperPlane, FaTwitter } from "react-icons/fa";
import { makeApiUrl } from "../common";
import { OPPONENT_MESSAGE_DELAY, APP_NAME, TWITTER_ID_REGEX } from "../consts";
import { Layout } from "../components/layout";
import { Message, SentenceRensponse } from "../types";
import { Seo } from "../components/seo";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

type Props = {
  screenName: string;
  error?: {
    status: number;
    message: string;
  };
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { screenName } = ctx.query;

  if (!screenName || screenName === null || typeof screenName !== "string")
    return {
      props: {
        error: {
          status: 404,
          message: "ScreenName を入力してください。",
        },
      },
    };

  if (!screenName.search(TWITTER_ID_REGEX))
    return {
      props: {
        error: {
          status: 404,
          message: "ScreenName の形式が間違っています。",
        },
      },
    };

  /*
  const url = new URL(makeApiUrl(`make_sentence/${screenName}`));
  const res = await fetch(url.href);
  const isError = res.status != 200;
  if (isError) {
    const message = (await res.json())["message"];
    return {
      props: {
        error: {
          status: res.status,
          message,
        },
      },
    };
  }*/

  return {
    props: {
      screenName,
    },
  };
};

const ChatPage: React.FC<Props> = ({ screenName }) => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const makeNewSentence = async () => {
    const sentenceRes = (await fetch(
      makeApiUrl(`make_sentence/${screenName}`)
    ).then((res) => res.json())) as SentenceRensponse;
    return sentenceRes;
  };

  useEffect(() => {
    const initialize = async () => {
      const current = new URL(location.href);
      const successfullyGenerated = current.searchParams.get(
        "successfully_generated"
      );
      if (
        successfullyGenerated !== null &&
        typeof successfullyGenerated !== "boolean"
      ) {
        localStorage.setItem("default_screen_name", screenName);
      }
      // Check Error
      if (!screenName || screenName === null || typeof screenName != "string")
        return;
      if (!screenName.search(TWITTER_ID_REGEX)) {
        setIsError(true);
        return;
      }
      const url = new URL(makeApiUrl(`make_sentence/${screenName}`));
      const res = await fetch(url.href);
      const isError = res.status != 200;
      setIsError(isError);
      if (isError) {
        setErrorMessage((await res.json())["message"]);
        return;
      }
      setTimeout(async () => {
        const { sentence, avatarUrl } = await makeNewSentence();
        setAvatarUrl(avatarUrl);
        setMessages([{ text: sentence, isMine: false }, ...messages]);
      }, 500);
    };
    initialize();
  }, []);

  const addMessage = (message: Message) =>
    setMessages((prevMessages) => [...prevMessages, message]);

  const addOpponentMessage = (text: string) =>
    setTimeout(() => {
      addMessage({ text, isMine: false });
      scrollBottomRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, OPPONENT_MESSAGE_DELAY);

  const onSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage({ text: chatInput, isMine: true });
    setChatInput("");
    scrollBottomRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    const { sentence } = await makeNewSentence();
    addOpponentMessage(sentence);
  };

  if (isError)
    return (
      <>
        <Seo />
        <Layout>
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "red",
              fontSize: ".8rem",
            }}
          >
            エラー: {errorMessage}
          </div>
        </Layout>
      </>
    );

  return (
    <>
      {screenName && (
        <>
          <Seo
            pageSubTitle={`${screenName}`}
            ogImageUrl={`https://twichat.app/api/user_og_image/${screenName}`}
          />
          <header className="header" id="chat_header">
            <div id="header_left">
              <div
                className="logo"
                id="header_logo"
                onClick={() => (location.href = "/")}
              >
                <object
                  type="image/svg+xml"
                  data="./images/logo.svg"
                  width={"26px"}
                />
                {APP_NAME}
              </div>
            </div>
            <div id="header_right">
              <p id="header_opponent_name">
                相手:{" "}
                <a href={`https://twitter.com/${screenName}`}>@{screenName}</a>{" "}
                の分身
              </p>
            </div>
          </header>
          <div id="chat">
            {messages.map((message, i) => {
              return (
                <div key={i} className="opponent_balloon">
                  {!message.isMine && (
                    <div>
                      <div className="opponent_faceicon">
                        <img src={avatarUrl} />
                      </div>
                      <div className="opponent_chatting">
                        <div className="opponent_says">
                          <p>{message.text}</p>
                        </div>
                        <button
                          id="opponent_chatting_share_btn"
                          onClick={() =>
                            open(
                              `https://twitter.com/intent/tweet?text=「${message.text}」by もうひとりの @${screenName} &hashtags=もうひとりの自分と話そう&url=https://twichat.iamtakagi.net/${screenName}`
                            )
                          }
                        >
                          <FaTwitter />
                        </button>
                      </div>
                    </div>
                  )}
                  {message.isMine && (
                    <div className="my_balloon">
                      <p>{message.text}</p>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={scrollBottomRef}></div>
          </div>
          <form
            id="chat_form"
            method="GET"
            onSubmit={(e) => {
              onSend(e);
            }}
          >
            <input
              id="chat_input"
              value={chatInput}
              required={true}
              maxLength={300}
              onChange={(event) => setChatInput(event.target.value)}
            />
            <button type="submit" id="chat_send_btn">
              <FaPaperPlane style={{ fontSize: "20px" }} />
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default ChatPage;
