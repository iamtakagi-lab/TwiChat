import React from "react";
import ReactDOM from "react-dom";
import { Chat } from "./pages/chat";
import { Index } from "./pages";
import { TermsOfService } from "./pages/terms_of_service";
import { PrivacyPolicy } from "./pages/privacy_policy";
import { Inquires } from "./pages/inquires";
import { Faq } from "./pages/faq";
import { Layout } from "./layout";

export const Root = () => {
  const current = new URL(location.href);

  if (current.pathname === "/") return <Index />;

  if (current.pathname === "/terms_of_service") {
    return <TermsOfService />;
  }

  if (current.pathname === "/privacy_policy") {
    return <PrivacyPolicy />;
  }

  if (current.pathname === "/inquires") {
    return <Inquires />;
  }

  if (current.pathname === "/faq") {
    return <Faq />;
  }

  if (current.pathname.match(new RegExp("/[0-9a-zA-Z_]{1,15}"))) {
    const screenName = current.pathname.replace("/", "");

    return <Chat screenName={screenName} />;
  }

  return (
    <Layout>
      <p>Not Found</p>
    </Layout>
  );
};


ReactDOM.render(<Root />, document.getElementById("root"));