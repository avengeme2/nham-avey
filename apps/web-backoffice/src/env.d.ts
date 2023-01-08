/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BO_FIREBASE_CONFIG_JSON: string
  readonly VITE_FIREBASE_VAPID_KEY: string
  readonly VITE_API_KEY: string
  readonly VITE_API_URL: string
  readonly VITE_HTTP_GRAPHQL_URI: string
  readonly VITE_WS_GRAPHQL_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
