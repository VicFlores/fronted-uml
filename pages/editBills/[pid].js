import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import styles from '../../styles/Home.module.css';

const GET_BILL = gql`
  query getBill($id: ID!){
    getBill(id: $id) {
      id
      name
      price
      to
      client
    }
  }
`;

const EDIT_BILL = gql`
  mutation updateBill($id: ID!, $input: BillInput) {
    updateBill(id: $id, input:$input) {
      name
      price
      to
      client
    }
  }
`;

const EditBills = () => {

  const router = useRouter();
  const { query: { id } } = router;

  const { data, loading, error } = useQuery(GET_BILL, {
    variables: {
      id
    }
  });

  const [updateBill] = useMutation(EDIT_BILL);

  const schemaValidation = Yup.object({
    name: Yup.string().required('Nombre de producto es requerido'),
		price: Yup.number().positive('No se admiten numero negativos').required('Precio es requerido'),
		client: Yup.string().required('Nombre de cliente es requerido'),
		to: Yup.date().required('Fecha de garantia es requerida')
  });

  if (loading) return 'Cargando';

  const { getBill } = data;

  const updateInfo = async valores => {
    const { name, price, client, to } = valores
    try {
      const { data } = await updateBill({
        variables: {
          id,
          input: {
            name,
            price,
            client,
            to
          }
        }
			})
			
			Swal.fire(
				'Actualizado',
				'Factura actualizada correctamente',
				'success'
			)

      router.push('/dashboard');
    } catch (error) {
      return new Error(error);
    }
  }

  return ( 
    <div>
      <Head>
        <title>Edit</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" /> 
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />       
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      </Head>

      <Navbar />

      <div className="container section">
        <h4 className="grey-text">Editar Factura</h4>
        <div className="divider"></div>
        
        <div className="card">
          <div className="card-content">

            <Formik
              validationSchema={ schemaValidation }
              enableReinitialize
              initialValues={ getBill }
              onSubmit={ (valores) => {
                updateInfo(valores)
              }}
            >
              { props => {
                return (
                  <form onSubmit={ props.handleSubmit }>

                    <div className="row">
                      <div className="col s12 m8">
                        <label htmlFor="name">Nombre de producto</label>
                        <div className="input-field">
                          <input 
                            id="name" 
                            type="text"
                            onChange={ props.handleChange }
                            onBlur={ props.handleBlur }
                            value={ props.values.name }
                          />
                        </div>

                        { props.touched.name && props.errors.name ? (
                          <div className= {styles.containerAlerts}>
														<div className= {styles.alerts}>
															<p>{ props.errors.name }</p>
														</div>
													</div>
                        ) : null }

                      </div>

                      <div className="col s12 m4">
                      <label htmlFor="price">Precio</label>
                        <div className="input-field">
                          <input 
                            id="price"
                            type="number"
                            onChange={ props.handleChange }
                            onBlur={ props.handleBlur }
                            value={ props.values.price }
                          />
                        </div>

                        { props.touched.price && props.errors.price ? (
                          <div className= {styles.containerAlerts}>
														<div className= {styles.alerts}>
															<p>{ props.errors.price }</p>
														</div>
													</div>
                        ) : null }

                      </div>

                      <div className="col s12 m8">
                      <label htmlFor="client">Nombre de cliente</label>
                        <div className="input-field">
                          <input 
                            id="client"
                            type="text"
                            onChange={ props.handleChange }
                            onBlur={ props.handleBlur }
                            value={ props.values.client }
                          />
                        </div>

                        { props.touched.client && props.errors.client ? (
													<div className= {styles.containerAlerts}>
														<div className= {styles.alerts}>
															<p>{ props.errors.client }</p>
														</div>
													</div>
                        ) : null }

                      </div>

                      <div className="col s12 m4">
                      <label htmlFor="to">Valido hasta</label>
                        <div className="input-field">
                          <input 
                            id="to" 
                            type="text"
                            onChange={ props.handleChange }
                            onBlur={ props.handleBlur }
                            value={ props.values.to }
                          />
                        </div>

                        { props.touched.to && props.errors.to ? (
													<div className= {styles.containerAlerts}>
														<div className= {styles.alerts}>
															<p>{ props.errors.to }</p>
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
														Editar factura
													</button>
												</div>
                      </div>

                    </div>

               </form>
                )
              }}
              
            </Formik>

          </div>
        </div>
      </div>
    </div>
  );
}
 
export default EditBills;