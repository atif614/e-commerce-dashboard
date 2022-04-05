import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {
        // console.log(name, price, category, company);
        if (!name || !price || !company || !category) {
            setError(true);
            return false
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        // console.log("object");
        result = await result.json();
        if (result) {
            navigate('/')
        }
        // console.log("result-->", result);
        // console.log(result);

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

                                        <h2 className="fw-bold mb-2 text-uppercase">Add Product</h2>

                                        <div className="form-outline form-white mb-4">
                                            <input type="text" id="typeEmailX" className="form-control form-control-lg" placeholder='Enter product name' value={name} onChange={(e) => { setName(e.target.value) }} />
                                            {error && !name && <span>Enter valid name</span>}
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="ptext" id="typePasswordX" className="form-control form-control-lg" placeholder='Enter product price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
                                            {error && !price && <span>Enter valid price</span>}

                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="text" id="typePasswordX" className="form-control form-control-lg" placeholder='Enter product category' value={category} onChange={(e) => { setCategory(e.target.value) }} />
                                            {error && !category && <span>Enter valid category</span>}

                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="text" id="typePasswordX" className="form-control form-control-lg" placeholder='Enter product company' value={company} onChange={(e) => { setCompany(e.target.value) }} />
                                            {error && !company && <span>Enter valid company</span>}
                                        </div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={addProduct}>Add</button>
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

export default AddProduct;