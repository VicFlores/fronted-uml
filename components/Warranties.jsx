import React from 'react';
import Router from 'next/router'
import { useMutation, gql } from '@apollo/client'
import Link from 'next/link';

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
      flaw
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

  const { name, price, client, from, flaw, to, id  } = clientDB;

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

   return ( 
      <tr>
        <td>{ name }</td>
        <td> $ { price }</td>
        <td>{ client }</td>
				<td>{ from }</td>
        <td>{ to }</td>
        <td>{ flaw }</td>
      </tr>
    );
 }
  
 export default Bills;