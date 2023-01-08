import axios from 'axios'

import firebaseService from '../services/firebase-service'
import { CONTENT_TYPE_JSON } from './api-constants'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'api-key': import.meta.env.VITE_API_KEY as string,
    'Content-Type': CONTENT_TYPE_JSON, // default to json
  },
})

api.interceptors.request.use(
  async config => {
    const token = await firebaseService.auth.currentUser?.getIdToken()
    if (token && config.headers) {
      // TODO: CHECK THIS
      if (typeof config?.headers?.set === 'function') {
        config.headers?.set('Authorization', `Bearer ${token}`)
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

export default api
