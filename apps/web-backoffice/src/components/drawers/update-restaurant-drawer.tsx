import { useEffect, useState } from "react"

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { AdminUpdateRestaurantMutationHookResult, Restaurant } from "@nham-avey/common"
import { Button, Drawer, Form, Input, Typography, Upload } from "antd"
import ImgCrop from "antd-img-crop"
import type { UploadChangeParam } from "antd/es/upload"
import type { UploadProps } from "antd/es/upload/interface"
import { AxiosRequestConfig } from "axios"
import compressImage from "browser-image-compression"
import api from "src/api/_api"
import { CONTENT_TYPE_FORM_DATA } from "src/api/api-constants"

const { useForm } = Form

export interface UpdateRestaurantFormValue {
  name: string
  address: string
}

interface UpdateRestaurantDrawerProps {
  restaurant: Restaurant | null
  visible: boolean
  onClose: () => void
  loading: boolean
  onSubmit: AdminUpdateRestaurantMutationHookResult[0]
  error: AdminUpdateRestaurantMutationHookResult[1]["error"]
}

export function UpdateRestaurantDrawer({
  restaurant,
  visible,
  onClose,
  loading,
  onSubmit,
  error,
}: UpdateRestaurantDrawerProps) {
  const [form] = useForm<UpdateRestaurantFormValue>()

  const customRequest: UploadProps["customRequest"] = async options => {
    const { onSuccess, onError, file, onProgress } = options

    const compressedFile = await compressImage(file as File, {
      maxWidthOrHeight: 1080,
      useWebWorker: true,
      maxSizeMB: 0.25,
    })

    const formData = new FormData()
    const config: AxiosRequestConfig = {
      headers: { "content-type": CONTENT_TYPE_FORM_DATA },
      onUploadProgress: event => {
        onProgress?.({ percent: (event.loaded / event.total) * 100 })
      },
    }
    formData.append("file", compressedFile)
    try {
      const res = await api.post("api/v1/upload", formData, config)

      onSuccess?.(res.data)
    } catch (err) {
      const error = new Error("Some error")
      onError?.(error)
    }
  }

  const [coverImageUrl, setCoverImageUrl] = useState<string>()
  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false)

  const handleFileChange: UploadProps["onChange"] = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setIsUploadingCoverImage(true)
      return
    }
    if (info.file.status === "done") {
      setIsUploadingCoverImage(false)
      setCoverImageUrl(info.file.response)
    }
  }

  useEffect(() => {
    if (restaurant) {
      form.setFieldsValue({
        ...restaurant,
      })
      setCoverImageUrl(restaurant.coverImg)
    }
  }, [form, restaurant])

  const onFinish = async (values: UpdateRestaurantFormValue) => {
    await onSubmit({
      variables: {
        input: {
          name: values.name,
          address: values.address,
          restaurantId: restaurant?.id as number,
          coverImg: coverImageUrl,
          categoryName: restaurant?.category?.name,
          vendorId: restaurant?.vendor?.id,
        },
      },
      onCompleted: () => {
        onClose()
        setCoverImageUrl("")
        form.resetFields()
      },
    })
  }

  return (
    <Drawer
      width={500}
      placement="right"
      onClose={onClose}
      visible={visible}
      forceRender
      title="Update Restaurant"
      className="max-w-full"
      contentWrapperStyle={{
        maxWidth: "100%",
      }}
    >
      <Form
        form={form}
        className="mt-3 text-center"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        autoComplete="off"
        name="update-admin"
      >
        <ImgCrop grid rotate quality={1}>
          <Upload
            name="coverImg"
            listType="picture-card"
            className="mb-10"
            accept="image/*"
            showUploadList={false}
            customRequest={customRequest}
            onChange={handleFileChange}
          >
            {coverImageUrl ? (
              <img src={coverImageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                {isUploadingCoverImage ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </ImgCrop>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name",
            },
          ]}
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Incorrect email format",
            },
          ]}
        >
          <Input className="w-full" autoComplete="off" />
        </Form.Item>

        <Typography.Text type="danger">{error?.message}</Typography.Text>

        <div className="text-right">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </Drawer>
  )
}

export default UpdateRestaurantDrawer