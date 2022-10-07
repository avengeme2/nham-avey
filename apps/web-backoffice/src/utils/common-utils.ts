import { UploadProps } from 'antd/es/upload/interface'
import { AxiosRequestConfig } from 'axios'
import compressImage from 'browser-image-compression'

import api from '../api/_api'
import { CONTENT_TYPE_FORM_DATA } from '../api/api-constants'

export const antUploadCustom: UploadProps['customRequest'] = async options => {
  const { onSuccess, onError, file, onProgress } = options

  const config: AxiosRequestConfig = {
    headers: { 'content-type': CONTENT_TYPE_FORM_DATA },
    onUploadProgress: event => {
      if (event.total) {
        onProgress?.({ percent: (event.loaded / event.total) * 100 })
      }
    },
  }
  const formData = new FormData()
  formData.append('file', file, (file as File).name)
  try {
    const res = await api.post('api/v1/upload', formData, config)
    onSuccess?.(res.data)
  } catch (err) {
    const error = new Error('Some error')
    onError?.(error)
  }
}

export const antUploadCustomRequestWithCompression: UploadProps['customRequest'] =
  async options => {
    const { onSuccess, onError, file, onProgress } = options

    const compressedFile = await compressImage(file as File, {
      maxWidthOrHeight: 1080,
      useWebWorker: true,
      maxSizeMB: 0.25,
    })

    const config: AxiosRequestConfig = {
      headers: { 'content-type': CONTENT_TYPE_FORM_DATA },
      onUploadProgress: event => {
        if (event.total) {
          onProgress?.({ percent: (event.loaded / event.total) * 100 })
        }
      },
    }
    const formData = new FormData()
    formData.append('file', compressedFile, compressedFile.name)
    try {
      const res = await api.post('api/v1/upload', formData, config)
      onSuccess?.(res.data)
    } catch (err) {
      const error = new Error('Some error')
      onError?.(error)
    }
  }
