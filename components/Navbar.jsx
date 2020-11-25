import Link from 'next/link';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

const GET_EMPLOYEE = gql`
  query getEmployee {
    getEmployee {
      name
      lastName
      email
    }
  }
`;

const Navbar = () => {

  const router = useRouter();

  const { data, loading, error } = useQuery(GET_EMPLOYEE);

  if (loading) return null;

  const { name, lastName } = data.getEmployee;

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  }

  return ( 
    <nav className="indigo darken-1">
      <div className="container">
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">Bienvenido/a: { name } { lastName } </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            
            <li>
              <Link href="/dashboard">
                <a>Facturas</a>
              </Link>
            </li>

            <li>
              <Link href="/warranty">
                <a>Garantias</a>
              </Link>
            </li>

            <li
              onClick={ () => logout() }
            >
              <a>Cerrar Sesion</a> 
            </li>
          </ul>
      </div>
      </div>
    </nav>
  );
}
 
export default Navbar;