/**
 * ⚙️ Last.fm API Configuration
 * 
 * @description Environment-based configuration for Last.fm API integration.
 * Loads API credentials and settings from environment variables.
 * 
 * @module lib/lastfm/config
 * 
 * @compatible
 * - 🎵 Used by all Last.fm service methods
 * - 🔐 Secure credential management
 * - 🌐 API base URL configuration
 * - 📝 Supports JSON and XML formats
 */

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
