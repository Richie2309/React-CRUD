import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Loader from '../components/Loader'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector((state) => state.auth)
    useEffect(() => {
        if (userInfo)
            navigate('/')
    }, [userInfo, navigate])



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

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

                <Row className='py-3'>
                    <Col>
                        New User?<Link to='/register'> Sign up</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>

    )
}

export default LoginScreen
