import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { gql, useQuery } from '@apollo/client'
import Bills from '../components/Bills';

const GET_BILLS = gql`
  query getBills {
    getBills {
      id
      name
      price
      from
      to
      client
    }
  }
`;

const Dashboard = () => {

  const { data, loading, error } = useQuery(GET_BILLS, {
    fetchPolicy: "cache-and-network"
  });

  if (loading) return 'Cargando';

  return ( 
    <div>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" /> 
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />       
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      </Head>

      <Navbar />

      <div className="container section">
        <h4 className="grey-text">Factura Clientes</h4>
        <div className="divider"></div>

        
        <div className="row section">
          <div className="col s12 m6">
            <Link href="/add-bills">
              <button className="waves-effect waves-light btn">Agregar nueva factura</button>
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
          <table className="responsive-table striped centered">
            <thead>
              <tr>
                  <th>Productos</th>
                  <th>Precio</th>
                  <th>Cliente</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                  <th>Garantia</th>
              </tr>
            </thead>

            <tbody>
              { data.getBills.map( clientDB => (
                <Bills
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
 
export default Dashboard;