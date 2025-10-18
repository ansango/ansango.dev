export const config = {
  api_key: import.meta.env.PUBLIC_LASTFM_API_KEY,
  app_name: import.meta.env.PUBLIC_LASTFM_APPNAME,
  base_url: import.meta.env.PUBLIC_LASTFM_API_BASE_URL,
  format: {
    json: "json",
    xml: "xml",
  },
  share_secret: import.meta.env.LASTFM_SHARED_SECRET,
};
