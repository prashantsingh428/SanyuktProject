const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sanyuktparivar3_db_user:qQrOWLx4NO3a9b83@cluster0.bhprzwx.mongodb.net/sanyukt_db?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const Order = require('./server/models/Order');
        const orders = await Order.find();
        console.log("Total orders:", orders.length);
        if (orders.length > 0) {
            console.log(orders[0]);
        }
        mongoose.disconnect();
    })
    .catch(console.error);
