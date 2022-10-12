import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { RouteMapping } from 'constant';
import Header from 'components/Header';
import { useLoginMutation, useSignupMutation } from 'app/services/auth';
import { setCredentials } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';

import classes from './styles.module.scss';

interface IFormInputs {
  username: string;
  email?: string;
  password: string;
}

interface AuthenticateProps {
  formType: string;
  title: string;
  headerMessage: string;
}

const schemaLogin = yup
  .object({
    username: yup.string().required('Username required'),
    password: yup.string().required('Password required'),
  })
  .required();

const schemaSignUp = yup
  .object({
    email: yup.string().email('Email is not valid').required('Email required'),
    username: yup.string().required('Username required'),
    password: yup.string().required('Password required'),
  })
  .required();

const Authenticate: React.FC<AuthenticateProps> = ({
  formType,
  headerMessage,
  title,
}: AuthenticateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(
      formType === RouteMapping.LOGIN ? schemaLogin : schemaSignUp
    ),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  const onSubmit = handleSubmit(async (data) => {
    if (formType === RouteMapping.LOGIN) {
      try {
        const response = await login(data).unwrap();
        if (response && response.data.accessToken) {
          localStorage.setItem(
            'access_token',
            JSON.stringify(response.data.accessToken)
          );
          dispatch(setCredentials(response));
          navigate('/dashboard');
        }
      } catch (err: any) {
        console.log(err);
        toast(err.data.errors);
      }
    } else {
      try {
        const response = await signup(data).unwrap();
        console.log(response.statusCode);
        if (response.statusCode === 200) {
          toast('Created successfully, please login!');
          navigate('/dashboard');
        }
      } catch (err: any) {
        toast(err.data.message);
      }
    }
  });

  return (
    <>
      <div className={classes.background}></div>
      <Header />
      <div className={classes.wrapperForm}>
        <div className={classes.headerForm}>
          <h2>{title}</h2>
          <Link
            to={`/${
              formType === RouteMapping.LOGIN
                ? RouteMapping.SIGNUP
                : RouteMapping.LOGIN
            }`}
          >
            {headerMessage}
          </Link>
        </div>
        <div className={classes.bodyForm}>
          <form onSubmit={onSubmit} className={classes.form}>
            {formType === RouteMapping.SIGNUP && (
              <>
                <input {...register('email')} placeholder="Email" />
                {errors?.email && (
                  <p className={classes.errorFormField}>
                    {errors.email?.message}
                  </p>
                )}
              </>
            )}
            <input {...register('username')} placeholder="Username" />
            {errors?.username && (
              <p className={classes.errorFormField}>
                {errors.username?.message}
              </p>
            )}
            <input
              {...register('password')}
              placeholder="Password"
              type="password"
            />
            {errors?.password && (
              <p className={classes.errorFormField}>
                {errors.password?.message}
              </p>
            )}

            <input type="submit" value={title} />
          </form>
        </div>
        <div className={classes.footerForm}>
          <p>
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
        </div>
      </div>
    </>
  );
};

export default Authenticate;
