const isProduction = process.env.NODE_ENV === "production"

export const APP_NAME = "TwiChat" as const
export const API_BASE_URL = isProduction ? "https://twichat.app/api/" : "http://localhost:3000/api/" as const
export const OPPONENT_MESSAGE_DELAY = 500