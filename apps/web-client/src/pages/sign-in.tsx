import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { joinClassName } from '@nham-avey/common'
import { useFirebaseSignInWithEmailAndPassword } from '@nham-avey/react-hook'

import { FormError } from '../components/form-error'
import { useRedirectOnAuthed } from '../hooks/use-redirect-on-authed'
import firebaseService from '../services/firebase-services'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

interface LoginForm {
  email: string
  password: string
}

const { auth } = firebaseService

const LoginPage = () => {
  useRedirectOnAuthed(auth, '/')
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const {
    signIn,
    isLoading: isSigningIn,
    error,
  } = useFirebaseSignInWithEmailAndPassword()

  const onSubmit = async () => {
    const { email, password } = getValues()
    signIn({ email, password, auth })
  }

  return (
    <div className="mt:10 flex h-screen flex-col items-center lg:mt-28">
      <NextSeo title="Login | Nham Avey" />
      <div className="container mx-auto flex w-full flex-col items-center px-4 lg:px-8">
        <h1 className="my-10 w-52 text-4xl font-semibold">Nham Avey</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 mb-5 grid w-full gap-3"
        >
          <div className="form-control w-full">
            <label htmlFor="email" className="label">
              <span className="label-text">Your Email Address</span>
            </label>
            <input
              id="email"
              {...register('email')}
              type="email"
              placeholder="Email"
              className="input-primary input w-full"
            />
            <label htmlFor="email" className="label">
              <span className="label-text-alt text-error">
                {errors.email?.message}
              </span>
            </label>
          </div>

          <div className="form-control w-full">
            <label htmlFor="password" className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              className="input-primary input w-full"
            />
            <label htmlFor="password" className="label">
              <span className="label-text-alt text-error">
                {errors.password?.message}
              </span>
            </label>
          </div>

          <button
            className={joinClassName('btn-primary btn', {
              loading: isSigningIn,
            })}
          >
            Log in
          </button>
          <div className="text-center">
            {error && <FormError errorMessage={error.message} />}
          </div>
        </form>

        <Link href="/sign-up-customer" className="link">
          Create an Account instead
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
