import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase'



const ListingPage = () => {



    const firebase = useFirebase();

    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState("");
    const [coverPicture, setCoverPicture] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault()
        await firebase.handleCreateNewListing(name, isbnNumber, price, price, coverPicture)
    }

    return (
        <div className='container mt-5'>  <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Book Name</Form.Label>
                <Form.Control onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Book name" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ISBN</Form.Label>
                <Form.Control onChange={e => setIsbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="ISBN Number" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>PRICE</Form.Label>
                <Form.Control onChange={e => setPrice(e.target.value)} value={price} type="number" placeholder="Price" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPicture">
                <Form.Label>Cover Pic</Form.Label>
                <Form.Control onChange={e => setCoverPicture(e.target.files[0])} type="file" placeholder="Upload Image" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>

        </div>
    )
}

export default ListingPage;