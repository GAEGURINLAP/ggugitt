import { css } from "@emotion/react";

const global = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  input {
    border: none;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #a2a2a2;
    }
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }

  @font-face {
    font-family: "Pretendard";
    font-style: black;
    font-weight: 900;
    src: local("Pretendard"), url(fonts/Pretendard-Black.woff2) format("woff2");
  }

  @font-face {
    font-family: "Pretendard";
    font-style: bold;
    font-weight: 700;
    src: local("Pretendard"), url(fonts/Pretendard-Bold.woff2) format("woff2");
  }

  @font-face {
    font-family: "Pretendard";
    font-style: semibold;
    font-weight: 600;
    src: local("Pretendard"),
      url(/fonts/Pretendard-SemiBold.woff2) format("woff2");
  }
  @font-face {
    font-family: "Pretendard";
    font-style: medium;
    font-weight: 500;
    src: local("Pretendard"),
      url(/fonts/Pretendard-Medium.woff2) format("woff2");
  }
  @font-face {
    font-family: "Pretendard";
    font-style: regular;
    font-weight: 400;
    src: local("Pretendard"),
      url(/fonts/Pretendard-Regular.woff2) format("woff2");
  }

  @font-face {
    font-family: "Pretendard";
    font-style: light;
    font-weight: 300;
    src: local("Pretendard"), url(/fonts/Pretendard-Light.woff2) format("woff2");
  }

  * {
    // Base
    font-size: 16px;
    font-family: "Pretendard";
    line-height: 150%;

    color: var(--black);
    background-color: #f7f7f7;

    box-sizing: border-box;
  }

  :root {
    font-family: "Pretendard";

    // Colorgraphy
    --white: #fff;
    --black: #121212;

    // Primary
    --main: #528ff9;
    --main-hover: #417bde;
  }

  a {
    text-decoration: none;
  }
`;

export default global;
