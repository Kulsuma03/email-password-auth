import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app)

const LogInBootstrap = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('')

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setSuccess(true);
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email)
    }
    const handleForgetPassword = () => {
        if(!userEmail){
            alert('Please set your email address')
        }
        sendPasswordResetEmail(auth, userEmail)
        .then( () => {
            alert('Password reset Email send, Please check your email')
        })
        .catch(error => {
            console.error(error)
        })
    }
    
   

    return (
        <div className='w-50 mx-auto'>
            <h1 className='text-success'>Please Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Example label</label>
                    <input onBlur={handleEmailBlur} name="email" type="email" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Another label</label>
                    <input name="password" type="password" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" />
                </div>
                <input className="btn btn-primary" type="submit" value="Login"></input>
            </form>
            {success && <p>Successfully login to the account</p> }
            <p><small>New to this website?Please <Link to='/register'>Register</Link></small></p>
            <p>Forget Password? <button onClick={handleForgetPassword} type="button" className="btn btn-link">Please Reset</button></p>
        </div>
    );
};

export default LogInBootstrap;