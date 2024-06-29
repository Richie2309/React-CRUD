import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
const Hero = () => {
    return (
        <div className=' py-5'>

            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card  w-75'
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                    <h1 className='text-center mb-4'>HELLO THERE!</h1>
                    <p className='text-center mb-4'>
                        <b> <h4>Welcome to CRUD!</h4><br />
                         Manage your data effortlessly with our easy-to-use interface. Get started by Creating, Reading, Updating, or Deleting your records!</b>
                    </p>
                    <div className='d-flex'>

                        {/* <LinkContainer to='/login'>
                            <Button variant='primary' className='me-3'>
                                Sign In
                            </Button>
                        </LinkContainer>

                        <LinkContainer to='/register'>
                            <Button variant='secondary'>
                                Sign Up
                            </Button>
                        </LinkContainer> */}

                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Hero
