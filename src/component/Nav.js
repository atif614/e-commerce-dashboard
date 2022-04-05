import React from 'react';
import { Link, useNavigate } from 'react-router-dom'


const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">

                        {auth ?
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add">Add Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/update">Update Product</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={logout} className="nav-link" to="/signup">Logout({JSON.parse(auth).name})</Link>
                                </li>
                            </ul>
                            :
                            <div style={{ marginLeft: "1100px" }}>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">SignUp</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Nav
