import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';



const LoginPage = () => {



    const firebase = useFirebase();
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(firebase);

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate("/")
        }
    }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('login as a user...')
        const result = await firebase.SigninUserWithEmailAndPassword(email, password)
        console.log('Successfully Login !', result);
    }
    console.log(firebase);

    // const handleloginGoogle = async (e) => {
    //     e.preventDefault();
    //     console.log('login as a user...')
    //     const result = await firebase.SigninWithGoogle(email, password)
    //     console.log('Successfully Login with Google !', result);
    // }
    // console.log(firebase);

    return (
        <div className='container mt-5'>  <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
            <h1 className='mt-5 mb-5'>OR</h1>
            <Button variant='success' onClick={firebase.SigninWithGoogle}>Signin with Google</Button>
        </div>
    )
}

export default LoginPage;