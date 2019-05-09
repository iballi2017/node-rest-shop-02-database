const express = require('express');
const router = express.Router();


//Import mongoose
const mongoose = require('mongoose');
//import the product model schema here
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message: "Handling GET requests to /products"
    // });
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        //The commented if-else block statement can be used on when the array of products is empty, but it isn't necessary cos
        //it isn't an error ifthe array is empty.
        // if(docs.length >= 0){
        //     res.status(200).json(docs);
        // }else{
        //     res.status(404).json({
        //         message : "No entry found!"
        //     });
        // };
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    //To meet up the requirement to the body-parser, whenever we create a route, we should create
    //what the client is expected to have i.e create the "product"
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };

    //the old product above is not needed again, so it is commented out
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    //we save the product info to store it in the database
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST requests to /products",
            //attach the created product hear to be sent
            createdProduct: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

})

router.get('/:productid', (req, res, next) => {
    const id = req.params.productid;
    // remove the dummy code below
    // if (id === 'special') {
    //     res.status(200).json({
    //         message: "You discovered a SPECIAL ID",
    //         id: id
    //     })
    // } else {
    //     res.status(200).json({
    //         message: "You passed an ID"
    //     })
    // }
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From database ", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
            // res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err });
        });

})

router.patch('/:productid', (req, res, next) => {
    // res.status(200).json({
    //     message: "Updated product!",
    // })
    const id = req.params.productid;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({
        _id : id
    }, {
        $set : //{
            // name : req.body.newName,
            // price : req.body.newPrice
        //}
        updateOps  // this is a dynamic process that will change anything on the body, instead of the req.body.** aproach commented out above
    })
    .exec()
    .then(result => {
        console.log(result); 
        res.status(200).json({result})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});


router.delete('/:productid', (req, res, next) => {
    // res.status(200).json({
    //     message: "Deleted product!",
    // })
    const id = req.params.productid;
    Product.remove({
        _id : id
    })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

module.exports = router;