import React, { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminLoginMutation } from '../slices/adminApiSlices';
import { setAdminCredentials } from '../slices/adminAuthSlice';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [adminLogin, { isLoading }] = useAdminLoginMutation();

    const { adminInfo } = useSelector(state => state.adminAuth)

    useEffect(() => {
        if (adminInfo)
            navigate('/admin/home')
    }, [adminInfo, navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await adminLogin({ email, password }).unwrap();
            dispatch(setAdminCredentials({ ...res }));
            navigate('/admin/home');
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1 className='text-center'>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                {isLoading && <Loader />}
                <Button type='submit' variant='primary' className='mt-3'>
                    Sign In
                </Button>
            </Form>
        </FormContainer>
    )
}

export default AdminLogin
