import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useSignInWithEmailAndPassword } from '@nham-avey/common'
import { Alert, Button, Form, Input } from 'antd'
import { motion } from 'framer-motion'

import firebaseService from '../../services/firebase-service'

const { getErrorMessage, auth } = firebaseService

export const SignInForm = () => {
  const {
    error,
    signIn,
    isLoading: isSigningIn,
  } = useSignInWithEmailAndPassword()

  const initialCredential = {
    email: '',
    password: '',
  }

  /**
   * @todo fix unmount memory leak
   * @todo add remember me
   */
  const onSignIn = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    await signIn({ email, password, auth })
  }

  return (
    <Form
      layout="vertical"
      name="sign-in-form"
      initialValues={initialCredential}
      onFinish={onSignIn}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input your email',
          },
          {
            type: 'email',
            message: 'Please enter a validate email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="text-primary" />} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined className="text-primary" />} />
      </Form.Item>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: error ? 1 : 0,
          marginBottom: error ? 20 : 0,
        }}
      >
        <Alert
          type="error"
          showIcon
          message={error && getErrorMessage(error)}
        />
      </motion.div>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isSigningIn}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignInForm
