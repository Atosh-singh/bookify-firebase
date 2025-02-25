import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import { useFirebase } from '../context/Firebase';

const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate()

    // const { displayName, price } = firebase.auth().currentUser;
    // const { name } = props;

    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url))
    }, [])

    return (
        <Card style={{ width: '18rem', margin: "25px" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    This book has a title {props.name} is sold by {props.displayName} and has a Rs{props.price}
                </Card.Text>
                <Button onClick={e => navigate(props.link)} variant="primary">View</Button>
            </Card.Body>
        </Card>
    )
}

export default BookCard;