import React from 'react';
import Router from 'next/router';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

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

	const confirmDeleted = () => {
		Swal.fire({
				title: '¿Deseas eliminar esta factura?',
				text: "¡Esta accion es irreversible!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, quiero eliminarla',
				cancelButtonText: 'No, cancelar'
			}).then( async (result) => {
				if (result.value) {

						try {

							const { data } = await deleteBill({
								variables: {
									id
								}
							});

							Swal.fire(
								'¡Eliminado!',
								'Factura eliminada exitosamente',
								'success'
							)
						} catch {
								return new Error(error);
						}
				}
			})
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