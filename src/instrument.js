import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://bd02bdd741b7e9cc904bf5d20b8230f0@o4509805492895744.ingest.us.sentry.io/4509805493944320",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  integrations: [],
});
