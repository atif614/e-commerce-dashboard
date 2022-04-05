import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        getProductDetails()
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }


    const updateProducts = async () => {
        // console.warn(name, price, category, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }
    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Update Product</h2>

                                        <div className="form-outline form-white mb-4">
                                            <input type="text" id="typeEmailX" className="form-control form-control-lg" placeholder='Enter product name' value={name} onChange={(e) => { setName(e.target.value) }} />
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="ptext" id="typePasswordX" className="form-control form-control-lg" placeholder='Enter product price' value={price} onChange={(e) => { setPrice(e.target.value) }} />

                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="text" id="typePasswordX" className="form-control form-control-lg" placeholder='Enter product category' value={category} onChange={(e) => { setCategory(e.target.value) }} />

                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="text" id="typePasswordX" className="form-control form-control-lg" placeholder='Enter product company' value={company} onChange={(e) => { setCompany(e.target.value) }} />
                                        </div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={updateProducts}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UpdateProduct;