const { response, request } = require('express');
const cors = require("cors");
const express = require('express');
require('./db/config');
const User = require('./db/User')
const Product = require('./db/Product');
const JWT = require('jsonwebtoken');
const JwtKey = 'e-comm';
const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    // res.send("Api working");
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    JWT.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong" })
        }
        res.send({ result, auth: token })
    })
    // res.send(result);
})
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            JWT.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong" })
                }
                res.send({ user, auth: token })
            })

        }

        else {
            res.send({ result: "No User found" })
        }
    } else {
        res.send({ result: "No User found" })
    }
});

app.post('/add-product', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get('/products', async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    }
    else {
        res.send({ result: "No Product Found" });
    }
});

app.delete('/product/:id', async (req, res) => {
    // res.send(req.params.id);
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get('/product/:id', async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: "No Record Found" });
    }
})

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.get("/search/:key", async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})


app.listen(5000);