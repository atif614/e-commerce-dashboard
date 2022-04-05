import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignUp = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password);
        if (name === '' || password === '' || email === '') {
            alert("All the field are mandatory")
        }
        else {

            let result = await fetch("http://localhost:5000/register", {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            // console.log("object");
            result = await result.json();
            // console.log("result-->", result);
            localStorage.setItem('user', JSON.stringify(result.result));
            localStorage.setItem('token', JSON.stringify(result.auth));

            if (result) {
                navigate('/')
            }
        }
    }
    return (
        <div className='container my-3'>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1"
                        className="form-label">Name</label>
                    <input type="text" value={name}
                        onChange={(event) => setName(event.target.value)} className="form-control" id="exampleInputname" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" value={email}
                        onChange={(event) => setEmail(event.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label value={password}
                        onChange={(event) => setPassword(event.target.value)} htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )

}
export default SignUp;
