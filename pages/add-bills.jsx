import React from 'react'
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/Home.module.css';

const NEW_BILL = gql`
  mutation newBill($input: BillInput ) {
    newBill(input: $input) {
      id
      name
      price
      from
      to
      client
      employee
    }
  }
`;

const AddBills = () => {

  const [newBill] = useMutation(NEW_BILL);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      to: '',
      client: '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Nombre de producto es requerido'),
      price: Yup.number().positive('No se admiten numero negativos').required('Precio es requerido'),
      client: Yup.string().required('Nombre de cliente es requerido'),
      to: Yup.date().required('Fecha de garantia es requerida')
    }),

    onSubmit: async valores => {
      const { name, price, to, client } = valores;
      try {
        const { data } = await newBill({
          variables: {
              input: {
                name,
                price,
                to,
                client
              }
          }
      });
      router.push('/dashboard');
      } catch (error) {
        console.log(error);
      }
    }
  });

  return ( 
    <div>
      <Head>
        <title>Add</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" /> 
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
				<link rel="stylesheet" href="./static/index.css"/>
      </Head>

      <Navbar />

      <div className="container section">
        <h4 className="grey-text">Agregar Factura</h4>
        <div className="divider"></div>
        
        <div className="card">
          <div className="card-content">
            <form onSubmit= {formik.handleSubmit}>

              <div className="row">
                <div className="col s12 m8">
                  <div className="input-field">
                    <input 
                      id="name" 
                      type="text"
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                      value={ formik.values.name }
                    />
                    <label htmlFor="name">Nombre de producto</label>
                  </div>

                { formik.touched.name && formik.errors.name ? (
									<div className= {styles.containerAlerts}>
										<div className= {styles.alerts}>
											<p>{ formik.errors.name }</p>
										</div>
									</div>
                ) : null }

                </div>

                <div className="col s12 m4">
                  <div className="input-field">
                    <input 
                      id="price"
                      type="number"
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                      value={ formik.values.price }
                    />
                    <label htmlFor="price">Precio</label>
                  </div>

                  { formik.touched.price && formik.errors.price ? (
                  <div className= {styles.containerAlerts}>
										<div className= {styles.alerts}>
											<p>{ formik.errors.price }</p>
										</div>
									</div>
                ) : null }

                </div>

                <div className="col s12 m8">
                  <div className="input-field">
                    <input 
                      id="client"
                      type="text"
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                      value={ formik.values.client }
                    />
                    <label htmlFor="client">Nombre de cliente</label>
                  </div>

                  { formik.touched.client && formik.errors.client ? (
										<div className= {styles.containerAlerts}>
											<div className= {styles.alerts}>
												<p>{ formik.errors.client }</p>
											</div>
										</div>
                ) : null }

                </div>

                <div className="col s12 m4">
                  <div className="input-field">
                    <input 
                      id="to" 
                      type="date"
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                      value={ formik.values.to }
                    />
                    <label htmlFor="to">Valido hasta</label>
                  </div>

                  { formik.touched.to && formik.errors.to ? (
										<div className= {styles.containerAlerts}>
											<div className= {styles.alerts}>
												<p>{ formik.errors.to }</p>
											</div>
										</div>
                ) : null }

                </div>

                <div className="col s12 m12">
									<div className={styles.marginButton}>
										<button 
											type="submit" 
											className="waves-effect waves-light btn"
										>
											Guardar
										</button>
									</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AddBills;