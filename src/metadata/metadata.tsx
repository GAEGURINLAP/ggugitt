import React from "react";
import { Helmet } from "react-helmet-async";

export function Page1Metas(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:site_name" content="사이트 이름" />
      <meta property="og:title" content="페이지 이름" />
      <meta property="og:url" content="사이트 주소" />
      <meta property="og:description" content="설명" />
    </Helmet>
  );
}

export function VoteMeta(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:site_name" content="오늘의 불개미" />
      <meta property="og:title" content="오늘의 불개미는 과연??" />
      <meta property="og:url" content="https://bullgaemi-survey.web.app" />
      <meta property="og:description" content="후뵤 중 누가 우승하였을까요?!" />
    </Helmet>
  );
}

export function Page3Metas(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:site_name" content="사이트 이름" />
      <meta property="og:title" content="페이지 이름" />
      <meta property="og:url" content="사이트 주소" />
      <meta property="og:description" content="설명" />
    </Helmet>
  );
}
