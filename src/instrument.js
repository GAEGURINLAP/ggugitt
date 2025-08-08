import * as Sentry from "@sentry/react";

const getEnvironment = () => {
  const hostname = window.location.hostname;
  const port = window.location.port;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "local";
  } else if (hostname.includes("ggugitt-dev.web.app")) {
    return "development";
  } else if (hostname.includes("ggugitt.com")) {
    return "production";
  }

  // 기본값
  return "unknown";
};

Sentry.init({
  dsn: "https://bd02bdd741b7e9cc904bf5d20b8230f0@o4509805492895744.ingest.us.sentry.io/4509805493944320",
  sendDefaultPii: true,
  environment: getEnvironment(),
  release: "ggugitt@1.0.0",
  autoSessionTracking: true,
  debug: process.env.NODE_ENV === "development",
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,

  integrations: [],

  beforeSend(event) {
    if (!event.tags) {
      event.tags = {};
    }
    event.tags.environment = getEnvironment();
    event.tags.project = "ggugitt";

    if (process.env.NODE_ENV === "development") {
      return event;
    }

    return event;
  },

  beforeBreadcrumb(breadcrumb) {
    return breadcrumb;
  },
});
