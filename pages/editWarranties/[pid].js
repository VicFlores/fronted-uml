import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

const EDIT_WARRANTY = gql`
	mutation warranty($id: ID!, $input: WarrantiesInput) {
		warranty(id:$id, input:$input) {
			name
			price
			client
			flaw
		}
	}
`;

const WarrantyDetails = () => {

	const router = useRouter();
  const { query: { id } } = router;

  const { data, loading, error } = useQuery(GET_BILL, {
    variables: {
      id
    }
  });

  const [warranty] = useMutation(EDIT_WARRANTY);

  const schemaValidation = Yup.object({
    name: Yup.string().required('Nombre del producto es requerido'),
		price: Yup.number().positive('No se admiten numero negativos').required('Precio es requerido'),
		client: Yup.string().required('Nombre del cliente es requerido'),
		flaw: Yup.string().required('Descripcion de garantia es requerido'),
  });

  if (loading) return 'Cargando';

  const { getBill } = data;

  const updateInfo = async valores => {
    const { flaw } = valores
    try {
      const { data } = await warranty({
        variables: {
          id,
          input: {
            flaw
          }
        }
      })

      router.push('/warranty');
    } catch (error) {
      return new Error(error);
    }
  }

  return ( 
    <div>
      <Head>
        <title>Garantia</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" /> 
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />       
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      </Head>

      <Navbar />

      <div className="container section">
        <h4 className="grey-text">Garantia</h4>
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
                          <div className="">
                            <p className="">Error</p>
                            <p>{ props.errors.name }</p>
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
                          <div className="">
                            <p className="">Error</p>
                            <p>{ props.errors.price }</p>
                          </div>
                        ) : null }

                      </div>

                      <div className="col s12 m6">
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
                        <div className="">
                          <p className="">Error</p>
                          <p>{ props.errors.client }</p>
                        </div>
                        ) : null }

                      </div>

											<div className="col s12 m6">
                      <label htmlFor="flaw">Descripcion de garantia</label>
                        <div className="input-field">
                          <input 
                            id="flaw"
                            type="text"
                            onChange={ props.handleChange }
                            onBlur={ props.handleBlur }
                            value={ props.values.flaw }
                          />
                        </div>

                        { props.touched.flaw && props.errors.flaw ? (
                        <div className="">
                          <p className="">Error</p>
                          <p>{ props.errors.flaw }</p>
                        </div>
                        ) : null }

                      </div>

                      <div className="col s12 m12">
                        <button 
                          type="submit" 
                          className="waves-effect waves-light btn"
                        >
                          Guardar
                        </button>
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
 
export default WarrantyDetails;