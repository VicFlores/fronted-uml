import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useQuery, gql } from '@apollo/client';
import Warranties from '../components/Warranties'

const GET_BILLS = gql`
  query getBills {
    getBills {
      id
      name
      price
      from
      to
      client
      flaw
    }
  }
`;

const Warranty = () => {

  const { data, loading, error } = useQuery(GET_BILLS, {
    fetchPolicy: "cache-and-network"
  });

  if (loading) return 'Cargando';

  return ( 
    <div>
      <Head>
        <title>Warranty</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" /> 
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />       
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      </Head>

      <Navbar />

      <div className="container section">
        <h4 className="grey-text">Garantia de clientes</h4>
        <div className="divider"></div>

        
        <div className="row section">
          <div className="col s12 m6">
            <div className="input-field">
              <input id="bills" type="text" />
              <label htmlFor="bills">Buscar garantia</label>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
          <table className="responsive-table striped centered">
            <thead>
              <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cliente</th>
                  <th>Vendido</th>
                  <th>Valido hasta</th>
                  <th>Descripcion</th>
              </tr>
            </thead>

            <tbody>
              { data.getBills.map( clientDB => (
                <Warranties
                key={ clientDB.id }
                clientDB = { clientDB }
                />
              ))}
            </tbody>

          </table>
          </div>
        </div>

      </div>
    </div>
  );
}
 
export default Warranty;