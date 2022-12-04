// const CustomerRouter = require ("express").Router();
// const Customer = require("../model/customerModel");
// const auth = require("../middleware/auth");

// CustomerRouter.post("/", auth, async(req, res) => {
//     try {
//         const { name } = req.body;
//         const newCustomer = new Customer({
//             name
//         });

//         const savedCustomer = await newCustomer.save();


//         res.json(savedCustomer);

//     } catch (err) {
//         console.error(err);
//         res.status(500).send();
//     };
// });

// CustomerRouter.get("/", auth, async (req, res) => {
//     try {
        
//         const customers = await Customer.find();
//         res.json(customers);


//     } catch (err) {
//         console.error(err);
//         res.status(500).send();
//     };
// });

// module.exports = CustomerRouter;