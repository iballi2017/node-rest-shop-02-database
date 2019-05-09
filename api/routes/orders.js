const express = require('express');
const router = express.Router();


//Handles incoming GET requests to /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Orders were fetched"
    });
});


//Handles incoming POST requests to /orders
router.post('/', (req, res, next) => {
    //To meet up the requirement to the body-parser, whenever we create a route, we should create
    //what the client is expected to have i.e create the "order"
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: "Order were created",
        //attach the created order hear to be sent
        order: order
    });
});

//Handles incoming GET requests to /orders
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Orders details",
        orderId: req.params.orderId
    });
});

//Handles incoming DELETE requests to /orders
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Orders deleted",
        orderId: req.params.orderId
    });
});


module.exports = router;