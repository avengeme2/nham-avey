import { FirebaseOptions } from 'firebase/app'

const firebaseConfig = JSON.parse(
  import.meta.env.VITE_BO_FIREBASE_CONFIG_JSON,
) as FirebaseOptions

export default firebaseConfig
