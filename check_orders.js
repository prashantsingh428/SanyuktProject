const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/sanyukt-parivar', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const Order = require('./server/models/Order');
        const orders = await Order.find();
        console.log("Total orders:", orders.length);
        console.log(orders);
        mongoose.disconnect();
    })
    .catch(console.error);
