import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import Loader from '../components/Loader'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        if (userInfo)
            navigate('/')
    }, [userInfo, navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword)
            return toast.error('Plese fill out all inputs')
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    return (
        <FormContainer>
            <h1 className='text-center'>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </Form.Group>

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

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                {isLoading && <Loader />}
                <Button type='submit' variant='primary' className='mt-3'>
                    Sign Up
                </Button>

                <Row className='py-3'>
                    <Col>
                        Already have an account?<Link to='/login'> Sign in</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>

    )
}

export default RegisterScreen
