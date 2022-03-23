import { API_BASE_URL } from "./consts";

export const makeApiUrl = (path: string) => new URL(`${API_BASE_URL}${path}`).href;