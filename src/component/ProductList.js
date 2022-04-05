import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token')),
            }
        });
        result = await result.json();
        // console.log(result);
        // console.log("object");
        setProducts(result);
        // console.log("result-->", result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete'
        });
        result = await result.json();
        if (result) {
            getProducts();

        }
    }
    const searchHandler = async (event) => {
        let key = event.target.value;
        if (key) {

            let result = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
        else {
            getProducts();
        }
    }

    return (
        <div className='container mt-3'>
            <h1 className=' mt-4 mb-4'>Product List</h1>
            <div class="input-group mb-4">
                <input type="text" class="form-control" placeholder="Search Product" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={searchHandler} />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">S. No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 ? products.map((item, index) =>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td><button className="btn btn-dark" onClick={() => deleteProduct(item._id)}>Delete</button>
                                </td>
                                <td><Link to={"/update/" + item._id}>  <button className='btn btn-dark'>Update</button> </Link></td>
                            </tr>
                        )
                            : <h1>No Result Found</h1>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList