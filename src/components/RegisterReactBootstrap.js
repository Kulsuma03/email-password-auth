import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';


const auth = getAuth(app)



const RegisterReactBootstrap = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false)
    const handleRegister = (event) => {
        
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Please set at least two upperCase');
            return;
          }
  
          if(password.length < 6){
            setPasswordError('You should be at least 6 characters');
            return;
          }
  
          if(!/(?=.*[!@#$&*])/.test(password)){
              setPasswordError('Please set at least 1 special characters')
              return;
          }

          setPasswordError('');

        createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            const user = res.user;
            console.log(user);
            setSuccess(true);
            form.reset();
            verifyEmail();
            updateUserName(name)
        })
        .catch(error => {
            console.error(error);
            setPasswordError(error.message);
        });
       
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            alert('please check your email and verify')
        })
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
        
    }

    return (
        <div className='w-50 mx-auto my-5'>
            <h3 className='text-primary'>Please Register</h3>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <p className='text-danger fond-bold'> {passwordError} </p>
                {
                    success && <p className='text-success'>User Created SuccessFully</p>
                }

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p><small>Already have an account? Please  <Link to='/login'>Login</Link></small></p>
            
        </div>
    );
};

export default RegisterReactBootstrap;