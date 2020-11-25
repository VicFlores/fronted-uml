import React from 'react';
import Router from 'next/router'
import { useMutation, gql } from '@apollo/client'

const DELETE_BILL = gql`
  mutation deleteBill($id: ID!) {
    deleteBill(id: $id) 
  }
`;

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
 
const Bills = ({ clientDB }) => {

  const [deleteBill] = useMutation(DELETE_BILL, {
    update(cache) {
      const { getBills } = cache.readQuery({ query: GET_BILLS });

      cache.writeQuery({
        query: GET_BILLS,
        data: {
          getBills: getBills.filter( actualClient => actualClient.id !== id )
        }
      })
    }
  });

  const { name, price, client, id } = clientDB;

  const confirmDeleted = async () => {
    const { data } = await deleteBill({
      variables: {
        id
      }
    });
  }

  const editBill = () => {
    Router.push({
      pathname: '/editBills/[id]',
      query: { id }
    });
	}
	
	const editWarranty = () => {
    Router.push({
      pathname: '/editWarranties/[id]',
      query: { id }
    });
  }

   return ( 
      <tr>
        <td>{ name }</td>
        <td> $ { price }</td>
        <td>{ client }</td>
        <td>
          <button 
            className="waves-effect waves-light btn-small"
            type='button'
            onClick={ () => editBill() }
          >
            Editar
          </button>
        </td>
        <td>
          <button 
            className="waves-effect waves-light btn-small"
            type='button'
            onClick={ () => confirmDeleted() }
          >
            Eliminar
          </button>
        </td>
        <td>
					<button 
						className="waves-effect waves-light btn-small"
						type='button'
						onClick={ () => editWarranty() }
					> 
						Garantia 
					</button>
        </td>
      </tr>
    );
 }
  
 export default Bills;