import React, { useState, useRef, useEffect, FormEvent } from "react";
import { FaPaperPlane, FaTwitter } from "react-icons/fa";
import { makeApiUrl } from "../common";
import { OPPONENT_MESSAGE_DELAY, APP_NAME, TWITTER_ID_REGEX } from "../consts";
import { Layout } from "../components/layout";
import { CustomSeo } from "../components/seo";
import { Message, SentenceRensponse } from "../types";
import { useRouter } from "next/router";
import Head from "next/head";

const Chat: React.FC<{}> = ({}) => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const makeNewSentence = async () => {
    const sentenceRes = (await fetch(
      makeApiUrl(`make_sentence/${screenName}`)
    ).then((res) => res.json())) as SentenceRensponse;
    return sentenceRes;
  };

  const router = useRouter();
  const { screenName } = router.query;

  useEffect(() => {
    if (router.isReady) {
      const initialize = async () => {
        /* Check Error */
        if (!screenName || screenName === null || typeof screenName != "string") return;
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
    }
  }, [screenName, router]);

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
      <Layout>
        <p style={{textAlign: "center", marginTop: "1rem"}}>エラー: {errorMessage}</p>
      </Layout>
    );

  return (
    <>
      {screenName && (
        <>
          <Head>
            <CustomSeo
              pageSubTitle={`${screenName}`}
              ogImageUrl={`https://twichat.app/api/user_og_image/${screenName}`}
            />
          </Head>
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
                              `https://twitter.com/intent/tweet?text=「${message.text}」by もうひとりの @${screenName} &hashtags=もうひとりの自分と話そう&via=twichat_app&url=https://twichat.app/${screenName}`
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
              placeholder="メッセージを入力してね"
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

export default Chat;
