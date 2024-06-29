import React from 'react'
import Header from './components/Header'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from './components/AdminHeader';

function App() {
  const location = useLocation()

  const isAdminRoute = () => {
    return location.pathname.startsWith('/admin');
  };

  return (
    <>
      {isAdminRoute() ? <AdminHeader /> : <Header />}
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  )
}

export default App