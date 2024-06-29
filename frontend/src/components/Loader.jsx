import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (

        <Spinner
            animation="border"
            role="status"
            style={{
                width: '80px',
                height: '80px',
                borderWidth: '6px',
                borderColor: '#4e89ae', 
            }}
        />
    );
};

export default Loader;
