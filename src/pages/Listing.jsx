import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

const handleSubmit = () => {}

const ListingPage = () => {

    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [coverPicture, setCoverPicture] = useState('');
    return (
        <div className='container mt-5'>  <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Book Name</Form.Label>
                <Form.Control onChange={e => setName(e.target.value)} value={name} type="test" placeholder="Book name" />
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ISBN</Form.Label>
                <Form.Control onChange={e => setIsbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="ISBN Number" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>PRICE</Form.Label>
                <Form.Control onChange={e => setPrice(e.target.value)} value={setPrice} type="text" placeholder="Price" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control onChange={e => setCoverPicture(e.target.files[0])} value={coverPicture} type="file" placeholder="Upload Image" />
            </Form.Group>

            <Button variant="primary" type="submit">
               Create
            </Button>
        </Form>
        
        </div>
    )
}

export default ListingPage;