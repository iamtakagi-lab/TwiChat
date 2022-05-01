const isProduction = process.env.NODE_ENV === "production"

export const APP_NAME = "TwiChat" as const
export const API_BASE_URL = isProduction ? "https://twichat.iamtakagi.net/api/" : "http://localhost:8500/api/" as const
export const OPPONENT_MESSAGE_DELAY = 500
export const TWITTER_ID_REGEX = new RegExp("/[0-9a-zA-Z_]{1,15}")
export const GOOGLE_ANALYTICS_ID = "G-E7C1H3PT4H"
