import { Col, Row } from 'antd'
import Lottie from 'lottie-react'
import { Helmet } from 'react-helmet-async'

import adminLottie from '../assets/lottie/66374-lottie-admin.json'
import { SignInForm } from '../components/form/sign-in-form'
import { APP_NAME } from '../config/app-config'

const PAGE_TITLE = `${APP_NAME} - Login`

const SignInPage = () => {
  return (
    <div className="h-screen">
      <Helmet title={PAGE_TITLE} />
      <Row justify="center" className="h-full">
        <Col
          xs={20}
          sm={20}
          md={24}
          lg={16}
          className="flex w-full justify-center"
        >
          <div className="container flex h-full flex-col justify-center">
            <Row justify="center" className="w-full">
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1>Sign In</h1>
                <div>
                  <SignInForm />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8} className="bg-primary h-full">
          <div className="flex h-full flex-col justify-center px-4">
            <div className="text-center text-white">
              <h1>Nham Avey Back Office</h1>
            </div>
            <Row justify="center">
              <Col xs={0} sm={0} md={0} lg={20}>
                <Lottie animationData={adminLottie} />
                <h1 className="text-center text-white">
                  Welcome to yeaksa back office
                </h1>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SignInPage
