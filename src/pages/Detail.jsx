import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import { useFirebase } from '../context/Firebase';
import  Button  from 'react-bootstrap/Button';
const BookDetailPage = () => {
  const params = useParams()
  const firebase = useFirebase();

  const [data, setData] = useState(null)
  const [url, setURL] = useState(null);

  const [qty, setQTY]=useState(1);

  useEffect(() => {
    firebase.getBookbyId(params.bookId).then(value => setData(value.data))
  }, [])

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url))
    }
  }, [data])

  const placeOrder = async() => { 
    
    const result = await firebase.placeOrder(params.bookId,qty )}


  if (data == null) return <h1>Loading... </h1>

  return (
    <div className="container" mt-5>
      <h1>{data.name}</h1>
      <img src={url} width="50%" style={{ borderRadius: "10px" }} ></img>
      <h1>Details</h1>
      <p>Price: Rs. {data.price} </p>
      <h1>Owner Details</h1>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control onChange={e => setQTY(e.target.value)} value={qty} type="number" placeholder="Quantity" />
      </Form.Group>
      <button onClick={placeOrder} variant="success">Buy Now</button>
    </div>
  )
}

export default BookDetailPage