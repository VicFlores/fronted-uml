import React, { useState } from 'react';
import Head from 'next/head';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik'

const AUTH_EMPLOYEE = gql`
  mutation authEmployee ($input: AuthInput) {
    authEmployee (input: $input) {
      token
    }
  }
`;

export default function Home() {

  const [authEmployee] = useMutation(AUTH_EMPLOYEE);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Email invalid').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),

    onSubmit: async valores => {
      const { email, password } = valores;

      try {
        
        const { data } = await authEmployee({
          variables: {
            input: {
              email,
              password
            }
          }
        });

        setMessage('Autenticando');

        const { token } = data.authEmployee;

        localStorage.setItem('token', token);

        setTimeout(() => {
          
          setMessage(null);
          router.push('/dashboard');

        }, 2000);


      } catch (error) {
        
        setMessage(error.message);

        setTimeout(() => {
          setMessage(null)
        }, 3000);
      }

    }
  });

  const showMessage = () => {
    return(
      <div>
        <p> { message } </p>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      </Head>

      <main>
        <div className="container section">
          <div className="row">
            <div className="col s12 m3"></div>
            <div className="col s12 m6">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Iniciar Sesion</span>
                  <form onSubmit={formik.handleSubmit}>

                  { message && showMessage() }
                    
                  <div className="input-field">
                    <input 
                      id="email" 
                      type="text"
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                      value={ formik.values.email }
                    />
                    <label htmlFor="email">Correo Electronico</label>
                  </div>

                  {  formik.touched.email && formik.errors.email ? (
                    <div>
                      <p>Error</p>
                      <p>{ formik.errors.email }</p>
                    </div>
                  ) : null }

                  <div className="input-field">
                    <input 
                      id="password" 
                      type="password"
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                      value={ formik.values.password }
                    />
                    <label htmlFor="password">Contraseña</label>
                  </div>

                  {  formik.touched.password && formik.errors.password ? (
                    <div>
                      <p>Error</p>
                      <p>{ formik.errors.password }</p>
                    </div>
                  ) : null }

                  <button 
                    className="waves-effect waves-light btn indigo darken-2"
                    type="submit"
                  >
                    Iniciar Sesion
                  </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s12 m3"></div>
          </div>
        </div>
      </main>
       
    </div>
  )
}
